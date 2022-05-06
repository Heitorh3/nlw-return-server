"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const dotenv_1 = __importDefault(require("dotenv"));
const jest_environment_node_1 = __importDefault(require("jest-environment-node"));
const pg_1 = require("pg");
const node_util_1 = __importDefault(require("node:util"));
const node_crypto_1 = __importDefault(require("node:crypto"));
dotenv_1.default.config({ path: '.env.testing' });
const execSync = node_util_1.default.promisify(node_child_process_1.exec);
const prismaBinary = './node_modules/.bin/prisma';
class PrismaTestEnvironment extends jest_environment_node_1.default {
    constructor(config) {
        super(config);
        const dbUser = process.env.DATABASE_USER;
        const dbPass = process.env.DATABASE_PASS;
        const dbHost = process.env.DATABASE_HOST;
        const dbPort = process.env.DATABASE_PORT;
        const dbName = process.env.DATABASE_NAME;
        this.schema = `test_${node_crypto_1.default.randomUUID()}`;
        this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
    }
    async setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;
        await execSync(`${prismaBinary} migrate deploy`);
        return super.setup();
    }
    async teardown() {
        const client = new pg_1.Client({
            connectionString: this.connectionString,
        });
        await client.connect();
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
        await client.end();
    }
}
exports.default = PrismaTestEnvironment;
