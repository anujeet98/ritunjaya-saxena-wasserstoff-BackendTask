// // Imports the Google Cloud client library
// const {PubSub} = require('@google-cloud/pubsub');

//     const projectId = 'wasserstoff-visionmark'; //GCP project ID
//     const topicNameOrId = 'my-topic'; // topic 
//     const subscriptionName = 'my-sub'; // Name for the subscription 

// // Instantiates a client
// const pubSubClient = new PubSub({projectId});



// async function publishMessage(topicNameOrId, data) {
//     const dataBuffer = Buffer.from(data);
  
//     try {
//       const messageId = await pubSubClient
//         .topic(topicNameOrId)
//         .publishMessage({data: dataBuffer});
//       console.log(`Message ${messageId} published.`);
//     } catch (error) {
//       console.error(`Received error while publishing: ${error.message}`);
//       process.exitCode = 1;
//     }
//   }



//   // Creates a new topic
//   const [topic] = await pubsub.createTopic(topicNameOrId);
//   console.log(`Topic ${topic.name} created.`);

//   // Creates a subscription on that new topic
//   const [subscription] = await topic.createSubscription(subscriptionName);

//   // Receive callbacks for new messages on the subscription
//   subscription.on('message', message => {
//     console.log('Received message:', message.data.toString());
//     process.exit(0);
//   });

//   // Receive callbacks for errors on the subscription
//   subscription.on('error', error => {
//     console.error('Received error:', error);
//     process.exit(1);
//   });

//   // Send a message to the topic
//   topic.publishMessage({data: Buffer.from('Test message!')});
// }

// quickstart();