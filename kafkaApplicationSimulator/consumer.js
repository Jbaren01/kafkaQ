const { Kafka } = require('kafkajs');

// const { REQUEST_QUEUE_SIZE } = consumer.events;
// const removeListener = consumer.on(REQUEST_QUEUE_SIZE, (e) =>
//   console.log('this is queue size', e.queueSize)
// );
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

        const { REQUEST } = consumer.events;
        const removeListener = consumer.on(REQUEST, (e) =>
          console.log(`REQUEST duration -----------> at ${e.payload.duration}`)
        );
        console.log(removeListener);

        // Instrumentation Event to monitor consumer heartbeat
        // const { HEARTBEAT } = consumer.events;
        // const removeListener = consumer.on(HEARTBEAT, (e) =>
        //   console.log(`heartbeat -----------> at ${e.payload.groupId}`)
        // );
        // console.log(removeListener);

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
