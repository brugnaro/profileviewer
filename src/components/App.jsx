import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Profile from './github/Profile.jsx'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: 'brugnaro',
            userData: [],
            userRepos: [],
            perPage: 5
        }
    }

    //get user data
    getUserDate(){
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userData: data});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({username: null});
                alert(err);
            }.bind(this)

        });
    }

    componentDidMount(){
        this.getUserDate();
    }

    render(){
        return(
            <div>
                <Profile userData = {this.state.userData} />
            </div>
        )
    }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};
App.defaultProps = {
    clientId: 'uyuyuyuyyuyuyuyu',
    clientSecret: 'uiuiuiuiuiuiuiuiuiuiuiuiweuieuiwuwei'
}

export default App