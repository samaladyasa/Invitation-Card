import details from "./details.json";

const weddingData = {
  hero: {
    bride: details.bride,
    groom: details.groom,
    date: details.weddingDate,
    invitation: "",
    buttonText: "Open Invitation",
  },

  invitation: {
    mantra: details.invitationMantra,
    title: details.invitationTitle,
    message: details.invitationMessage,
    brideRole: details.brideRole,
    brideParents: details.brideParents,
    groomRole: details.groomRole,
    groomParents: details.groomParents,
    date: details.date,
    time: details.time,
    venue: details.venue,
    closing: details.invitationClosing,
  },
};

export default weddingData;
