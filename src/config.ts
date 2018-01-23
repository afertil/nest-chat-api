export const APP_CONFIG = {
  accessTokenExpires: '1h',
  refreshTokenExpires: '8h',
  jwtSecret: 'MyS3cr3tK3Y',
  jwtSession: {
    session: false
  },
  databaseURL:
    'mongodb://admin:admin@nest-rest-api-shard-00-00-2rnby.mongodb.net:27017,nest-rest-api-shard-00-01-2rnby.mongodb.net:27017,nest-rest-api-shard-00-02-2rnby.mongodb.net:27017/chat?ssl=true&replicaSet=nest-rest-api-shard-0&authSource=admin'
};
