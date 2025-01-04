import axios from "axios";
const token = () => {
    if (localStorage.hasOwnProperty("user")) {
        return `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    }
    return "iJhcmVlakBnbWFpbC5jb20iLCJpYXQiOjE3MzU5MzgzMjUsImV4cCI6MTczNjAyNDcyNX0.COfhEqvGbmyox-HvBX-CWv5FS1rK1IMwN9OEtvvRqyY"
}
const handleUnauthorizedError = () => {

    localStorage.clear();
    window.location.href = '/login';
    return { message: "Please login to continue." };
};

function extractErrorMessages(message) {
    if (typeof message === 'string') {
        return message; // Directly return if it's a string
    } else if (typeof message === 'object') {
        return Object.values(message).flat().join(', '); // Flatten any array of messages
    }
    return 'An unknown error occurred.'; // Fallback message
}
export const Helper = {


    Get: async ({ url, hasToken, data = null }) => {

        try {
            const response = await axios.get(url, hasToken ? {
                headers: {
                    Authorization:"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmVlakBnbWFpbC5jb20iLCJpYXQiOjE3MzU5Mzk5OTksImV4cCI6MTczNjAyNjM5OX0.Co1wsg5SG454585XxJfklMT0QgH3g9JjwuokW2qEZuI",
                    //  ApiKey: "acO+4JTx8lmZmOo4qZemnKS7JufhcyviuvUaz5VL7faQo60isZFx/sf7FbtNs1FlkLG03/HsIs+6odEwY/30HrST7JZaDsAmTMrvB0qm25LqxoZquKThjgW9S6NCX8lWWLhp6mUOCBfe86B0dcgEhe9SXgmFVqA8UvzZ+G+YC8Y="
                },
                params: data ? data : {}

            } : {
                headers: {
                    //  ApiKey: "acO+4JTx8lmZmOo4qZemnKS7JufhcyviuvUaz5VL7faQo60isZFx/sf7FbtNs1FlkLG03/HsIs+6odEwY/30HrST7JZaDsAmTMrvB0qm25LqxoZquKThjgW9S6NCX8lWWLhp6mUOCBfe86B0dcgEhe9SXgmFVqA8UvzZ+G+YC8Y="
                },
                params: data ? data : {}
            }
            )
            if (response.success && response.status === 200) {

                return {
                    message: response.data.message,
                    response: response.data
                }
            } else {
                return {
                    message: response.data.message,
                    response: response.data
                }
            }


        } catch (err) {
            console.log(err);


            if (err.response) {

                const err_response = err.response.data;


                if (err.response.status === 403) {
                    return { message: "Access Forbidden: You do not have permission to access this resource." };
                } else if (err.response.status === 401) {
                    return handleUnauthorizedError();
                } else if (err_response.success !== undefined && err_response.data !== undefined) {
                    if (err_response.data.length > 0) {
                        return { message: err_response.data };
                    } else {
                        return { message: err_response.message };
                    }
                }
            }

            // Default error message 
            return { message: err.message };
        }
    },
    Get_Abort: async ({ url, hasToken, data = null, signal }) => {

        try {
            const response = await axios.get(url, hasToken ? {
                headers: {
                    Authorization: token(),
                    /// ApiKey: "acO+4JTx8lmZmOo4qZemnKS7JufhcyviuvUaz5VL7faQo60isZFx/sf7FbtNs1FlkLG03/HsIs+6odEwY/30HrST7JZaDsAmTMrvB0qm25LqxoZquKThjgW9S6NCX8lWWLhp6mUOCBfe86B0dcgEhe9SXgmFVqA8UvzZ+G+YC8Y="
                },
                params: data ? data : {},
                signal: signal

            } : {
                params: data ? data : {},
                signal: signal,
                headers: {
                    //   ApiKey: "acO+4JTx8lmZmOo4qZemnKS7JufhcyviuvUaz5VL7faQo60isZFx/sf7FbtNs1FlkLG03/HsIs+6odEwY/30HrST7JZaDsAmTMrvB0qm25LqxoZquKThjgW9S6NCX8lWWLhp6mUOCBfe86B0dcgEhe9SXgmFVqA8UvzZ+G+YC8Y="
                }
            }
            )
            if (response.success && response.status === 200) {
                return {
                    message: response.data.message,
                    response: response.data
                }
            } else {
                return {
                    message: response.data.message,
                    response: response.data
                }
            }


        } catch (err) {
            console.log(err);


            if (err.response) {

                const err_response = err.response.data;


                if (err.response.status === 403) {
                    return { message: "Access Forbidden: You do not have permission to access this resource." };
                } else if (err.response.status === 401) {
                    return handleUnauthorizedError();
                } else if (err_response.success !== undefined && err_response.data !== undefined) {
                    if (err_response.data.length > 0) {
                        return { message: err_response.data };
                    } else {
                        return { message: err_response.message };
                    }
                }
            }

            // Default error message 
            return { message: err.message };
        }
    },
    Post: async ({ url, hasToken, data = null }) => {
        try {
            const response = await axios.post(url, data, hasToken ? {
                headers: {
                    Authorization: token(),
                    // ApiKey: "your_api_key_here"
                }
            } : {
                headers: {
                    // ApiKey: "your_api_key_here"
                }
            });

            if (response.data.success && response.status === 200) {
                return {
                    message: response.data.message,
                    response: response.data
                };
            } else {
                return {
                    message: response.data.message,
                    response: response.data,
                };
            }

        } catch (err) {
            console.log(err);

            if (err.response) {
                const err_response = err.response.data;

                // Handle specific status codes
                if (err.response.status === 403) {
                    return { message: "Access Forbidden: You do not have permission to access this resource." };
                } else if (err.response.status === 401) {
                    return handleUnauthorizedError();
                } else if (err.response.status === 422 || err.response.status === 400) {
                    // Handle validation errors
                    return {
                        message: extractErrorMessages(err_response.message)
                    };
                } else if (err_response.success !== undefined && err_response.data !== undefined) {
                    if (err_response.data.length > 0) {
                        return { message: err_response.data.join(', ') }; // Join multiple messages if needed
                    } else {
                        return { message: err_response.message };
                    }
                }
            }

            // Default error message 
            return { message: err.message };
        }
    },
    Put: async ({ url, hasToken, data = null }) => {
        try {
            const response = await axios.put(url, data, hasToken ? {
                headers: {
                    Authorization: token(),
                    //  ApiKey: "acO+4JTx8lmZmOo4qZemnKS7JufhcyviuvUaz5VL7faQo60isZFx/sf7FbtNs1FlkLG03/HsIs+6odEwY/30HrST7JZaDsAmTMrvB0qm25LqxoZquKThjgW9S6NCX8lWWLhp6mUOCBfe86B0dcgEhe9SXgmFVqA8UvzZ+G+YC8Y="
                }
            } : {
                headers: {
                    //  ApiKey: "acO+4JTx8lmZmOo4qZemnKS7JufhcyviuvUaz5VL7faQo60isZFx/sf7FbtNs1FlkLG03/HsIs+6odEwY/30HrST7JZaDsAmTMrvB0qm25LqxoZquKThjgW9S6NCX8lWWLhp6mUOCBfe86B0dcgEhe9SXgmFVqA8UvzZ+G+YC8Y="
                }
            }
            )
            if (response.success && response.status === 200) {
                return {
                    message: response.data.message,
                    response: response.data,
                }
            } else {
                return {
                    message: response.data.message,
                    response: response.data,
                }
            }

        } catch (err) {
            console.log(err);


            if (err.response) {

                const err_response = err.response.data;


                if (err.response.status === 403) {
                    return { message: "Access Forbidden: You do not have permission to access this resource." };
                } else if (err.response.status === 401) {
                    return handleUnauthorizedError();
                } else if (err_response.success !== undefined && err_response.data !== undefined) {
                    if (err_response.data.length > 0) {
                        return { message: err_response.data };
                    } else {
                        return { message: err_response.message };
                    }
                }
            }

            // Default error message 
            return { message: err.message };
        }
    },
    Delete: async ({ url, hasToken, data = null }) => {
        try {
            const response = await axios.delete(url, hasToken ? {
                headers: {
                    Authorization: token(),
                    //    ApiKey: "acO+4JTx8lmZmOo4qZemnKS7JufhcyviuvUaz5VL7faQo60isZFx/sf7FbtNs1FlkLG03/HsIs+6odEwY/30HrST7JZaDsAmTMrvB0qm25LqxoZquKThjgW9S6NCX8lWWLhp6mUOCBfe86B0dcgEhe9SXgmFVqA8UvzZ+G+YC8Y="
                },
                // params : data ? data : {}
            } : {
                headers: {
                    //  ApiKey: "acO+4JTx8lmZmOo4qZemnKS7JufhcyviuvUaz5VL7faQo60isZFx/sf7FbtNs1FlkLG03/HsIs+6odEwY/30HrST7JZaDsAmTMrvB0qm25LqxoZquKThjgW9S6NCX8lWWLhp6mUOCBfe86B0dcgEhe9SXgmFVqA8UvzZ+G+YC8Y="
                }
            }
                , data)


            if (response.success && response.status === 200) {
                return {
                    message: response.data.message,
                    response: response.data,
                }
            } else {
                return {
                    message: response.data.message,
                    response: response.data,
                }
            }
        } catch (err) {
            console.log(err);


            if (err.response) {

                const err_response = err.response.data;


                if (err.response.status === 403) {
                    return { message: "Access Forbidden: You do not have permission to access this resource." };
                } else if (err.response.status === 401) {
                    return handleUnauthorizedError();
                } else if (err_response.success !== undefined && err_response.data !== undefined) {
                    if (err_response.data.length > 0) {
                        return { message: err_response.data };
                    } else {
                        return { message: err_response.message };
                    }
                }
            }

            // Default error message 
            return { message: err.message };
        }

    }
}
