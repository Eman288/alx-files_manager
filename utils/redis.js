import {createClient} from 'redis';

class RedisClient {
	constructor() {
		this.client = createClient();

		this.client.on('error', (err) => {
            console.error(`Redis client error: ${err.message}`);
        });


		this.client.connect().catch((err) => {
			console.error(`Failed to Connect to Redis: ${err.message}`);
		});
	}

	isAlive() {
		return this.client.isReady;
	}

	async get(key) {
		return await this.client.get(key);
	}

	async set(key, value, time) {
		await this.client.set(key, value, { EX: time });
	}

	async del(key) {
		await this.client.del(key);
	}
}

const redisClient = new RedisClient();
export default redisClient;
