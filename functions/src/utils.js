import { Configuration, OpenAIApi } from "openai"
import { apiKey } from "./secrets.js"

const configuration = new Configuration({
  apiKey: apiKey,
})

const openai = new OpenAIApi(configuration);

export const getAnalysis = async (req, res) => {
  const { userInput } = req.body
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `return postive, negative or neutral sentiment analysis of: ${userInput}`,
      temperature: 1,
    });
    res.send(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).send("server error")
  }
}

export const getSql = async (req, res) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Create a SQL request to " + req.body.message,
        },
      ],
    })
    console.log(completion.data.choices[0].message)
    res.send(completion.data.choices[0].message)
  } catch (error) {
    console.error(error)
    res.status(500).send("server error")
  }
}
