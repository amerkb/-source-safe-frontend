import axios from "axios";
const token = () => {
    if (localStorage.getItem("token")) {
        return `Bearer ${localStorage.getItem("token")}`
    }
    return `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmVlakBnbWFpbC5jb20iLCJpYXQiOjE3MzY1NDIzNDEsImV4cCI6MTczNjYyODc0MX0.6tLypRwy8_vxaLeqfYDfZoyPEbAQhWtvq2ncH2fMGxk`
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
                    Authorization: token(),
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
          const response = await axios.post(
            url,
            data,
            hasToken
              ? {
                  headers: {
                    Authorization: token(),
                  },
                }
              : {}
          );
      
          if (response.data.success && response.status === 200) {
            return {
              message: response.data.message,
              response: response.data,
            };
          } else {
            return {
              message: response.data.message || "An unknown error occurred.",
              response: response.data,
            };
          }
        } catch (err) {
          console.error(err);
      
          if (err.response) {
            const errResponse = err.response.data;
            const statusCode = err.response.status;
      
            switch (statusCode) {
              case 401:
                return handleUnauthorizedError(); // Function to handle unauthorized access
              case 403:
                return { message: "Access Forbidden: You do not have permission to access this resource." };
              case 422:
              case 400:
                return {
                  message: extractErrorMessages(errResponse.message || "Validation failed."),
                };
              default:
                if (errResponse.success !== undefined && errResponse.data) {
                  return {
                    message: Array.isArray(errResponse.data)
                      ? errResponse.data.join(", ") // Handle multiple messages
                      : errResponse.message || "An unknown error occurred.",
                  };
                }
            }
          }
      
          // Default fallback error
          return { message: err.message || "An unknown error occurred." };
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
