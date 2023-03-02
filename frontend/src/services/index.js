export const getAllPublicationsService = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/publications`,
    {
      headers: {
        Authorization: token
      }
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.publications;
};

export const getSinglePublicationService = async (id, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/publications/${id}`,
    {
      headers: { Authorization: token }
    }
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.publication;
};

export const registerUserService = async ({ email, username, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, username, password })
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.authToken;
};

export const getMyUserDataService = async ({ token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/users/profile`,
    {
      headers: {
        Authorization: token
      }
    }
  );

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.user;
};

export const sendPublicationService = async ({ data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/publications`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const deletePublicationService = async ({ id, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/publications/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: token
      }
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const searchResultsService = async ({ search, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/publications?${search}`,
    {
      headers: {
        Authorization: token
      }
    }
  );

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.publications;
};

export const addPublicationPhotoService = async ({ id, data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/publications/${id}/photo`,
    {
      method: 'POST',
      body: data,
      headers: {
        Authorization: token
      }
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};
