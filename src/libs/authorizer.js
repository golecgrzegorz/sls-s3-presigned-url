module.exports.handle = async function(event) {
  const token = process.env.AUTH_TOKEN;

  const policy = {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: event.methodArn
        }
      ]
    }
  }

  if (event.headers.Authorization !== `Bearer ${token}`) {
    console.debug('Invalid/missing Authorization header: %s\n', event.headers.Authorization);

    policy.policyDocument.Statement[0].Effect = 'Deny';
    return policy;
  }

  return policy;
}
