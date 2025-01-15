const EmailConfig: RosterMechanics.Config.Other.Email = (async () => {
  return await new Promise((resolve) => {
    resolve({
      confidentiality: {
        // eslint-disable-next-line no-multi-str
        text: 'Notice of confidentiality: This transmission contains information that may be confidential and that may\
         also be proprietary; unless you are the intended recipient of the message (or authorized to receive it for the\
          intended recipient), you may not copy, forward, or otherwise use it, or disclose its contents to anyone else.\
           If you have received this transmission in error, please notify us immediately and delete it from your system.',
      },
      filters: {
        justListed: {
          labelName: '***Just Listed***',
          query: 'from:(noreplymail@xpressdocs.com) Marketing Campaign Ready',
        },
        agentDigest: {
          labelName: '***Agent Digest***',
          query:
            'to:(agents.camelback@russlyon.com OR agents.carefree@russlyon.com OR agents.desertmountain@russlyon.com OR agents.flagstaff@russlyon.com OR agents.pinnaclepeak@russlyon.com OR agents.prescott@russlyon.com OR agents.sedona@russlyon.com OR agents.sev@russlyon.com OR agents.tubac@russlyon.com OR agents.tucson@russlyon.com OR agents.westvalley@russlyon.com OR agents.maricopa@russlyon.com)',
        },
      },
    })
  })
})()

export default EmailConfig
