import React from "react";
import { Formik, Form } from "formik";
import { TypeCampaignObj } from "types/electionTypes";
import "./index.css";

type PropsCardCampaign = {
  campaign: TypeCampaignObj;
  onRequestOpen: (campaignSlug: string) => void;
  onRequestDelete: (campaignSlug: string) => Promise<any>;
};

export default function CardCampaign({ campaign: { slug, name, commitments_file }, onRequestDelete, onRequestOpen }: PropsCardCampaign) {

  return <Formik
    initialValues={{}}
    onSubmit={() => onRequestDelete(slug)}

  >
    {function ({ isSubmitting }) {
      return (
        <Form>
          <h1>{name}</h1>
          <h1>{slug}</h1>
        </Form>
      )
    }
    }
  </Formik>
}