import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import Avatar from "react-rainbow-components/components/Avatar";
import { useApp } from "context/AppContext";
import { TypeElectionStats } from "types/electionTypes";
// import docStyles from "reports/VotesStatsGeneral/styles";
import { TypeSchool } from "types/appTypes";
import school from "configurations/school";

type PropsVotesStatsGeneral = {
  stats: TypeElectionStats;
};

function getStats(stats: TypeElectionStats) {
  const tags = Object.keys(stats.tags);
  const campaigns = Object.keys(stats.campaigns);

  const totalTags = Object.keys(stats.tags).length;
  const totalCampaigns = Object.keys(stats.campaigns).length;
  const totalVotes = stats.vote_count;
  const votesRestantes = Object.values(stats.voters_tags_count).map(Number).reduce((p, c) => c + p) - totalVotes;
  return {
    tags, campaigns, totalTags, totalCampaigns,
    totalVotes, votesRestantes
  }
}

export function VotesStatsGeneral({ stats }: PropsVotesStatsGeneral) {
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
      <h1>{stats.theElection.name}</h1>
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
        <p>{stats.vote_campaigns_count[campaign] || 0}</p>
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
      {tags.map((tag, index) => (<div key={index} className="campaign-general-stats-wrapper">
        <p>{stats.vote_tags_count[tag] || 0}/{stats.voters_tags_count[tag]}</p>
        <h1>{stats.tags[tag].name}</h1>
      </div>))}
    </section>
  </div>
}

type PropsDocVotesStatsGeneral = {
  stats: TypeElectionStats;
  school: TypeSchool;
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
})

export function docVotesStatsGeneral({ stats, school: { schoolIcon } }: PropsDocVotesStatsGeneral) {
  // const { totalVotes } = getStats(stats);

  return <Document onRender={() => {
    return {};
  }} title="Estado genernal">
    <Page size="A4" style={styles["body"]}>
      <Text style={styles["header"]}>{stats.theElection.name}</Text>
      <Text style={styles["title"]}>Reporte general votaciones</Text>
      <Text style={styles["author"]} fixed>{school.schoolName}</Text>
    </Page>
  </Document>
}