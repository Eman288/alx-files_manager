import {createClient} from 'redis';

class RedisClient {
	constructor() {
		this.client = createClient();

		this.client.on('error', (error) => {
            console.error(`Redis client error: ${error.message}`);
        });
	}

	isAlive() {
		return this.client.connected;
	}

	async get(key) {
		return new Promise((resolve, reject) => {
	      	this.client.get(key, (error, reply) => {
        	if (error) {
          		reject(error);
        	} else {
          		resolve(reply);
        	}
      		});
    		});
	}

	async set(key, value, durationInSeconds) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, durationInSeconds, value, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }
	

	async del(key) {
		return new Promise((resolve, reject) => {
			this.client.del(key, (error, reply) => {
				if (error) {
                                        reject(error);
				} else {
                                        resolve(reply);
                                }
                                });
                                });
			}
	}


const redisClient = new RedisClient();
export default redisClient;
