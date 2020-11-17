import React, { memo, useState, useMemo, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAsyncFn } from "react-use";
import useFetch from "hooks/useFetch";
import Input from "react-rainbow-components/components/Input";
import Button from "react-rainbow-components/components/Button";
import VisualPicker from "react-rainbow-components/components/VisualPicker";
import VisualPickerOption from "react-rainbow-components/components/VisualPickerOption";
import Badge from "react-rainbow-components/components/Badge";
import Avatar from "react-rainbow-components/components/Avatar";
import crayonImageSettings from "icons/images/crayon-image-settings.png";
import cherryImage600 from "icons/images/cherry-660.png";
import urbanLine319 from "icons/images/urban-line-319.png";
import hugoSuccess from "icons/images/hugo-success-1.png";
import bermudaListIsEmpty from "icons/images/bermuda-list-is-empty.png";
import { isProduction } from "configurations/variables";
import { REACT_API_URL } from "configurations/api";
import { TypeCampaignObj, TypeCandidateObj, TypeCargo, TypeElectionFunc } from "types/electionTypes";
import "./index.css";

type PropsScreenCredentials = {
  election: TypeElectionFunc;
};

type ArgCheckFrstAuth = { first_auth: string, value: string } |
{ second_auth: string, value: string };

type ArgsPostVote = { campaign_slug: string; first_auth: string; second_auth: string; };

const styleAvatar = { width: 110, height: "auto" };
const { fetchPostWithoutToken } = useFetch();

function checkAuthUser(
  url: string, data: ArgCheckFrstAuth,
  cb: (val: boolean) => any,
  catchFunc: (e: Error) => any
) {
  const message = "No encontrado";
  return fetchPostWithoutToken(url, data).then(res => {
    if (res === "ok") return cb(true);
    throw new Error(message);
  }).catch(() => catchFunc(new Error(message)));
}
function postVote(
  url: string, data: ArgsPostVote,
  cb: (val: boolean) => any,
  catchFunc: (e: Error) => any
) {
  const message = "Ya has votado";
  return fetchPostWithoutToken(url, data).then(res => {
    if (res === "ok") return cb(true);
    throw new Error(message);
  }).catch(() => catchFunc(new Error(message)));
}

function resolveUrl(url: string) {
  if (isProduction) return url;
  return REACT_API_URL + url;
}

export default memo(function ScreenCredentials({ election }: PropsScreenCredentials) {
  const [isFirstOk, setIsFirstOk] = useState(false);
  const [isSecondOk, setIsSecondOk] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [isRedirect, setRedirect] = useState(false);

  const campaigns = useMemo(() => ({ ...election.campaigns } as { [k: string]: TypeCampaignObj }), [election.campaigns]);
  const candidates = useMemo(() => ([...election.candidates || []] as TypeCandidateObj[]), [election.candidates]);
  const cargos = useMemo(() => ({ ...election.cargos } as { [k: string]: TypeCargo }), [election.cargos]);

  const [first_auth, setfirst_auth] = useState("");
  const [second_auth, setsecond_auth] = useState("");
  const [selectedCampaign, selectCampaign] = useState("");

  const [error_second_auth, seterrsecond_auth] = useState<Error | null>(null);
  const [error_first_auth, seterrfirst_auth] = useState<Error | null>(null);
  const [error_post_vote, seterror_post_vote] = useState<Error | null>(null);

  const [asyncPostVote, execAsyncPostVote] = useAsyncFn(postVote, []);
  const [asyncCheck, execAsyncCheck] = useAsyncFn(checkAuthUser, []);

  useEffect(() => {
    if (error_post_vote) {
      setTimeout(() => {
        return setRedirect(true);
      }, 4000);
    }
  }, [error_post_vote]);

  useEffect(() => {
    if (isVoted) {
      setTimeout(() => {
        return setRedirect(true);
      }, 4000);
    }
  }, [isVoted]);

  if (isRedirect) {
    return <Redirect to="/" />
  }

  if (isVoted) {
    return <div className="wrapper-card-credential list-items-col">
      <div className="container-card-credential custom-is-voted-background">
        <img src={hugoSuccess} alt={hugoSuccess} />
        <h1>Tu voto fue exitoso!</h1>
        <h5 className="">Te estamos redireccionando</h5>
      </div>
    </div>
  }
  if (error_post_vote) {
    return <div className="wrapper-card-credential list-items-col">
      <div className="container-card-credential custom-is-voted-background">
        <img src={bermudaListIsEmpty} alt={bermudaListIsEmpty} />
        <h1>{error_post_vote.message}</h1>
        <h5 className="">Te estamos redireccionando</h5>
      </div>
    </div>
  }

  if (!isFirstOk) {
    return <div className="wrapper-card-credential list-items-col">
      <form className="container-card-credential" onSubmit={(event) => {
        event.preventDefault();
        return execAsyncCheck(`/votes/${election.id}/firstauth`, {
          first_auth: election.first_auth?.field || "",
          value: first_auth
        }, setIsFirstOk, seterrfirst_auth);
      }}>
        <img src={crayonImageSettings} alt={crayonImageSettings} />
        <h1>Ingresa tu {election.first_auth?.name}</h1>
        <Input
          autoComplete="false"
          value={first_auth}
          label={election.first_auth?.name}
          disabled={asyncCheck.loading}
          error={error_first_auth?.message}
          onChange={({ target: { value } }) => setfirst_auth(value)}
        />
        <Button
          variant="brand"
          className="container-card-credential-m3"
          label="Verificar"
          type="submit"
          disabled={asyncCheck.loading}
        />
      </form>
    </div>
  }

  if (!isSecondOk) {
    return <div className="wrapper-card-credential list-items-col">
      <form className="container-card-credential" onSubmit={(event) => {
        event.preventDefault();
        return execAsyncCheck(`/votes/${election.id}/secondauth`, {
          second_auth: election.second_auth?.field || "",
          value: second_auth
        }, setIsSecondOk, seterrsecond_auth);
      }}>
        <img src={cherryImage600} alt={cherryImage600} />
        <h1>Ingresa tu {election.second_auth?.name}</h1>
        <Input
          autoComplete="false"
          value={second_auth}
          label={election.second_auth?.name}
          disabled={asyncCheck.loading}
          error={error_second_auth?.message}
          onChange={({ target: { value } }) => setsecond_auth(value)}
        />
        <Button
          variant="brand"
          className="container-card-credential-m3"
          label="Verificar"
          type="submit"
          disabled={asyncCheck.loading}
        />
      </form>
    </div>
  }

  return <div className="wrapper-card-credential list-items-col">
    <h1>Selecciona la lista por la cual vas a votar!</h1>
    <PreviewCampaign
      candidates={candidates}
      cargos={cargos}
      voter_identify={{ first_auth, second_auth }}
      postVote={({ campaign_slug, first_auth, second_auth }) => {
        const url = `votes/${election.id}/vote`;

        return execAsyncPostVote(url, {
          campaign_slug, first_auth, second_auth
        }, setIsVoted, seterror_post_vote);
      }}
      disabled={asyncPostVote.loading}
      selectedCampaign={selectedCampaign}
      campaigns={campaigns} />
    <VisualPicker
      size="large"
      label="Selecciona una para tener una vista previa"
      value={selectedCampaign}
      onChange={(val) => selectCampaign(String(val))}
    >
      {
        Object.keys(campaigns).map((campaignSlug, index) => {
          const campaign = campaigns[campaignSlug];
          const imgUrl = campaign.logo_image ? campaign.logo_image[0].url : "";

          return <VisualPickerOption key={index} name={campaignSlug} disabled={asyncPostVote.loading}>
            <Avatar
              style={styleAvatar}
              assistiveText={campaign.name}
              title={campaign.name}
              size="large"
              src={resolveUrl(imgUrl)}
            />
            <h4>{campaign.name}</h4>
          </VisualPickerOption>
        })
      }
      <VisualPickerOption name="nulo" disabled={asyncPostVote.loading}>
        <Avatar style={styleAvatar} assistiveText="Nulo" title="Nulo" size="large" src={urbanLine319} />
        <h4>Nulo</h4>
      </VisualPickerOption>
    </VisualPicker>
  </div>
});

type PropsPreviewCampaign = {
  disabled: boolean;
  voter_identify: { first_auth: string; second_auth: string; };
  selectedCampaign: string;
  cargos: { [k: string]: TypeCargo };
  campaigns: { [k: string]: TypeCampaignObj };
  candidates: TypeCandidateObj[];
  postVote: (data: ArgsPostVote) => Promise<any>;
}

function PreviewCampaign({ campaigns, disabled, postVote, voter_identify, cargos, candidates, selectedCampaign }: PropsPreviewCampaign) {
  const campaign = campaigns[selectedCampaign];
  const listCandidates = candidates.filter(cnd => cnd.campaign_slug === selectedCampaign);

  if (selectedCampaign === "nulo") {
    return <div className="prev-list-selected list-items-col">
      <p style={{ padding: 10 }}>Has seleccionado</p>
      <h3>Nulo</h3>
      <div className="prev-list-selected-vote">
        <Button onClick={() => {
          const { first_auth, second_auth } = voter_identify;
          return postVote({
            campaign_slug: selectedCampaign,
            first_auth, second_auth
          });
        }} label="Votar" variant="destructive" disabled={disabled} />
      </div>
    </div>
  }

  if (campaign) {
    return <div className="prev-list-selected list-items-col">
      <p>Has seleccionado</p>
      <h3>{campaign.name}</h3>
      <div className="prev-list-selected-list-integrants list-items-row">
        {
          listCandidates.map((candidate, index) => {
            const cargo = cargos[candidate.cargo];

            return <div key={index} className="prev-list-selected-integrant list-items-col">
              <p>{candidate.names.split(" ")[0]} {candidate.surnames.split(" ")[0]}</p>
              <Badge
                variant="success"
                label={cargo.alias}
              />
            </div>
          })
        }
      </div>
      <div className="prev-list-selected-vote">
        <Button onClick={() => {
          const { first_auth, second_auth } = voter_identify;
          return postVote({
            campaign_slug: selectedCampaign,
            first_auth, second_auth
          });
        }} label="Votar" variant="destructive" disabled={disabled} />
      </div>
    </div>
  }
  return null;
}