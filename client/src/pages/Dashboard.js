import Auth from '../utils/auth';
import ProfileComp from '../components/dashboard';
import Navigation from '../components/navigation';


const Dashboard = () => {

    Auth.isLoggedIn(Auth.getToken());

    return(
        <div>
            <Navigation />
            <ProfileComp />
        </div>
    )
}

export default Dashboard;