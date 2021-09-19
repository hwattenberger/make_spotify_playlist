
const Login = () => {
    const getURL = (() => {
        const baseURL = "https://accounts.spotify.com/authorize"
        const client_id = "06e166bd17b344c88e61f8524d8e8629"
        const redirectURL = process.env.REACT_APP_REDIRECT_URL ; //"http://localhost:3000/"
        const scope = "user-top-read%20streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private"
    
        const url = `${baseURL}?client_id=${client_id}&response_type=token&redirect_uri=${redirectURL}&state=test&scope=${scope}`
        return url;
      })

    return (  
        <div className="LoginDiv">
            <h2>Please login to Spotify to create a playlist</h2>
            <a href={getURL()}><div id="loginBtn">Login</div></a>
        </div>
    );
}
 
export default Login;