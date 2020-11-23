import React from "react";
import { useApp } from "context/AppContext";
import Avatar from "react-rainbow-components/components/Avatar";
import { TypeElectionStats } from "types/electionTypes";
import "./index.css";

type PropsVotesStatsGeneral = {
  stats: TypeElectionStats;
};

function getStats(stats: TypeElectionStats) {
  const tags = stats.tags;
  const campaigns = Object.keys(stats.campaigns);

  const totalTags = stats.tags.length;
  const totalCampaigns = Object.keys(stats.campaigns).length;
  const totalVotes = stats.total_votes;
  const totalParticipants = Object.keys(stats.count_per_tag).map((t) => {
    return stats.count_per_tag[t];
  }).reduce((p, c) => p + c, 0);
  const votesRestantes = totalParticipants - totalVotes;
  return {
    tags, campaigns, totalTags, totalCampaigns,
    totalVotes, votesRestantes, totalParticipants
  }
}

export default function VotesStatsGeneral({ stats }: PropsVotesStatsGeneral) {
  const { school: { schoolIcon, schoolName } } = useApp();
  const { campaigns, tags, totalCampaigns, totalTags, totalVotes, votesRestantes } = getStats(stats);

  return <div className="pd" >
    <div className="list-items-row">
      <Avatar
        src={schoolIcon}
        assistiveText={schoolName}
        title={schoolName}
      />
      <p>{schoolName}</p>
      <h1>{stats.name}</h1>
    </div>
    <section className="list-items-row">
      <div className="campaign-general-stats-wrapper">
        <p>{totalTags}</p>
        <h1>Etiquetas</h1>
      </div>
      <div className="campaign-general-stats-wrapper">
        <p>{totalCampaigns}</p>
        <h1>Partidos</h1>
      </div>
      {campaigns.map((campaign, index) => (<div key={index} className="campaign-general-stats-wrapper">
        <p>{stats.votes_group.count_by_campaign[campaign] || 0}</p>
        <h1>{stats.campaigns[campaign].name}</h1>
      </div>))}
      <div className="campaign-general-stats-wrapper">
        <p>{totalVotes}</p>
        <h1>Votos</h1>
      </div>
      <div className="campaign-general-stats-wrapper">
        <p>{votesRestantes}</p>
        <h1>Restantes</h1>
      </div>
      {tags.map((tag, index) => {
        if (stats.count_per_tag[tag]) {
          return <div key={index} className="campaign-general-stats-wrapper">
            <p>{stats.votes_group.count_by_tag[tag] || 0}/{stats.count_per_tag[tag]}</p>
            <h1>{tag}</h1>
          </div>
        }
        return null;
      })}
    </section>
  </div>
}