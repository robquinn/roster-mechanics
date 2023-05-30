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
      },
    })
  })
})()

export default EmailConfig
