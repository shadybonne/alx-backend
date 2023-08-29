import redis from 'redis';
// const util = require('util');
import { promisify } from 'util';
import { createClient } from 'redis';
import { truncateSync } from 'fs';

// r = redis.Redis()

const client = redis.createClient();

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

const asyncGet = promisify(client.get).bind(client);

async function displaySchoolValue(schoolName) {
    try {
	const value = await asyncGet(schoolName);
	console.log(value);
	client.quit();
    } catch (err) {
	console.error(err);
	client.quit();
    }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
