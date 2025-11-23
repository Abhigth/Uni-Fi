const API = "http://localhost:5000/api";

export async function post(path, body, token) {
  return fetch(API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  }).then(res => res.json());
}

export async function put(path, body, token) {
  return fetch(API + path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  }).then(res => res.json());
}

export async function get(path, token) {
  return fetch(API + path, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }).then(res => res.json());
}
