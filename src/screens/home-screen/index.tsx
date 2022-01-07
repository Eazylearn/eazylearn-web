import { RootStateProps } from "../../reducers";
import { AuthProps } from "../../reducers/auth";
import { connect } from "react-redux";
import AdminHomeScreen from "./admin";
import LecturerHomeScreen from "./lecturer";

interface ConnectedHomeScreenProps {

}

interface HomeScreenStateProps {
  auth: AuthProps,
}

interface HomeScreenDispatchProps {
  
}

interface HomeScreenProps extends ConnectedHomeScreenProps, HomeScreenStateProps, HomeScreenDispatchProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({
  auth,
}) => {
  if (auth.type === 0) {
    return (<AdminHomeScreen />);
  }
  if (auth.type === 1) {
    return (<LecturerHomeScreen />);
  }

  return <AdminHomeScreen />;
}

const ConnectedHomeScreen: React.FC<ConnectedHomeScreenProps> = connect((state: RootStateProps) => ({ auth: state.auth }), {})(HomeScreen);

export default ConnectedHomeScreen;
