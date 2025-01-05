export const isAuthenticated = () => {
    return !!localStorage.getItem("jwt"); // Returns true if JWT exists, false otherwise
};