import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Profile from './github/Profile.jsx'
import Search from './github/Search.jsx'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: 'brugnaro',
            userData: [],
            userRepos: [],
            perPage: 10
        }
    }

    //get user data from github
    getUserDate(){
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userData: data});
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({username: null});
                alert(err);
            }.bind(this)

        });
    }

    //get user repos
    getUserRepos(){
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userRepos: data});
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({username: null});
                alert(err);
            }.bind(this)

        });
    }

    handleFormSubmit(username){
        this.setState({username: username}, function(){
           this.getUserDate();
           this.getUserRepos(); 
        });
    }

    componentDidMount(){
        this.getUserDate();
        this.getUserRepos();
    }

    render(){
        return(
            <div>
                <Search onFormSubmit = {this.handleFormSubmit.bind(this)}/>
                <Profile {...this.state} />
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