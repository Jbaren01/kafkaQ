const { Kafka } = require('kafkajs');

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['Shreshths-MacBook-Pro-2.local:9092'],
    });
    const consumer = kafka.consumer({
      groupId: 'test',
    });
    console.log('connecting...');
    await consumer.connect();
    console.log('connected!');

    await consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `MSG: ${result.message.value} PARTITION: ${result.partition}`
        );
      },
    });
  } catch (err) {
    console.log(`ERROR: ${err}`);
  } finally {
  }
}
