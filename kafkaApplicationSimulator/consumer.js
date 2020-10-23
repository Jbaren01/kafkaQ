const { Kafka } = require('kafkajs');
const { REQUEST_QUEUE_SIZE } = consumer.events;
const removeListener = consumer.on(REQUEST_QUEUE_SIZE, (e) =>
  console.log('this is queue size', e.queueSize)
);
// const msg = process.argv[2];

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['Jonathans-iMac.local:9092'],
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
    console.log('before queue size');
    removeListener();
  } catch (err) {
    console.log(`ERROR: ${err}`);
  } finally {
  }
}
