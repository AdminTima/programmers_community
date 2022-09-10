const Topic = require('../models/Topic');
const Room = require("../models/Room");


class TopicService {
    async createTopic(topicName) {
        try {
            const topic = await Topic.findOne({name: topicName});
            if(topic) {
                throw new Error('This name of topic is already taken');
            }
            return await Topic.create({name: topicName});
        } catch (err) {
            console.log(err);
            throw new Error('Error topic');
        }
    }

    async getTopics() {
        try {
            const topics = await Topic.find();
            return topics;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new TopicService();