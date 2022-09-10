const topicService = require('../service/topic-service');


class TopicController {
    async createTopic(req, res) {
        const { topicName } = req.body;
        try {
            const newTopic = await topicService.createTopic(topicName);
            return res.json(newTopic);
        } catch (err) {
            console.log(err);
            return res.status(400).json('An error occured during creating topic');
        }
    }

    async getAllTopics(req, res) {
        try {
            const allTopics = await topicService.getTopics();
            return res.json(allTopics);
        } catch (err) {
            console.log(err);
            return res.status(400).json('An error occured');
        }
    }
}

module.exports = new TopicController();