const deleteFormResponse = async ({ email, formId }: { email: string; formId: string }): Promise<void> => {
  // Open a form by ID and log the responses to each question.
  await new Promise<void>((resolve) => {
    const form = FormApp.openById(formId)
    const formResponses = form.getResponses()
    for (let i = 0; i < formResponses.length; i += 1) {
      const formResponse = formResponses[i]
      const itemResponses = formResponse.getItemResponses()
      for (let j = 0; j < itemResponses.length; j += 1) {
        const itemResponse = itemResponses[j]
        const title = itemResponse.getItem().getTitle()
        const response = itemResponse.getResponse()

        if (title === 'Email' && response === email) {
          console.log('Checking response #%s with email: "%s"', (i + 1).toString(), response)
          form.deleteResponse(formResponse.getId())
          console.log(
            'RESPONSE FOUND. DELETING RESPONSE (#%s - ID: %s) WITH ASSOCIATED EMAIL: %s',
            i,
            formResponse.getId(),
            response,
          )
          resolve()
        }
      }
    }
    resolve()
  })
}

export default deleteFormResponse
