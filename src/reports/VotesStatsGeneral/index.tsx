import React from "react";
import { Document, Page, Text, StyleSheet, Image, View } from "@react-pdf/renderer";
import { useApp } from "context/AppContext";
import { TypeElectionStats } from "types/electionTypes";
import Avatar from "react-rainbow-components/components/Avatar";
import { TypeSchool } from "types/appTypes";
import school from "configurations/school";
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
  const votesRestantes = Object.keys(stats.count_per_tag).map((t) => {
    return stats.count_per_tag[t];
  }).reduce((p, c) => p + c, 0) - totalVotes;
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
});

export function HeaderSection({ header, author }: { header: string, title?: string, author: string }) {
  return <View>
    <Text style={styles["header"]}>{header}</Text>
    <Text style={styles["title"]}>Reporte general votaciones</Text>
    <Text style={styles["author"]} fixed>{author}</Text>
  </View>
}

export function docVotesStatsGeneral({ stats, school: { schoolIcon } }: PropsDocVotesStatsGeneral) {
  // const { totalVotes } = getStats(stats);

  return <Document title="Estado genernal">
    <Page size="A4" wrap style={styles["body"]}>
      <Text style={styles["header"]}>{stats.name}</Text>
      <Text style={styles["title"]}>Reporte general votaciones</Text>
      <Text style={styles["author"]} fixed>{school.schoolName}</Text>
    </Page>
  </Document>
}