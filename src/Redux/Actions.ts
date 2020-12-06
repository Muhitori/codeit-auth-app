export class Actions {
	public static userPostFetch(user) {
		return (dispatch) => {
			return fetch("/localhost:9000/signup", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ user }),
			})
				.then((response) => response.json)
				.then((data: any) => {
					if (data) {
						//TODO
					} else {
						localStorage.setItem("token", data.jwt);
						dispatch(this.userLogin(data.user));
					}
				});
		};
	}

	public static userLoginFetch(user) {
		return (dispatch) => {
			return fetch("/localhost:9000/signin", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ user }),
			})
				.then((response) => response.json)
				.then((data: any) => {
					if (data) {
						//TODO
					} else {
						localStorage.setItem("token", data.jwt);
						dispatch(this.userLogin(data.user));
					}
				});
		};
	}

	public static getProfileFetch(user) {
    return (dispatch) => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
			return fetch("/localhost:9000/profile", {
				method: "GET",
				headers: {
					"Content-type": "application/json",
          Accept: "application/json",
          'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({ user }),
			})
				.then((response) => response.json)
				.then((data: any) => {
          if (data) {
            localStorage.removeItem("token");
					} else {
						dispatch(this.userLogin(data.user));
					}
				});
		};
	}

	static userLogin(userObj) {
		return {
			type: "USER_LOGIN",
			payload: userObj,
		};
	}
}