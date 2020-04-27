import React, {Component} from "react";
import Header from "../../common/header/header";
import {Card, colors} from '@material-ui/core';
import "./home.css"
import {Grid} from '@material-ui/core';

import {Avatar} from '@material-ui/core';
import {CardHeader} from '@material-ui/core';
import {red} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class Home extends Component {
    constructor(props) {
        super(props);
        this.onLogoutHandler = this.onLogoutHandler.bind(this)
        this.openMyProfile = this.openMyProfile.bind(this);
        this.onSearchChangeListener = this.onSearchChangeListener.bind(this);

        this.state = {
            posts: [{
                user: {},
                images: {
                    thumbnail: {},
                    low_resolution: {},
                    standard_resolution: {}
                },
                tags: [],
                caption: {
                    from: {}
                },
                likes: {},
                comments: {},
                location: {},
                commentsectionpost: [],


            }],
            backupposts: [{
                user: {},
                images: {
                    thumbnail: {},
                    low_resolution: {},
                    standard_resolution: {}
                },
                tags: [],
                caption: {
                    from: {}
                },
                likes: {},
                comments: {},
                location: {},
                commentsectionpost: [],


            }],
            profile_picture: "",
            addCommentField: "",
            commentsection: [{}],
            isUserLoggedIn: "true",
            defaultAccessToken:"",

        }
    }

    openMyProfile = () => {

        console.log(this.state.defaultAccessToken)

        this.props.history.push({
            pathname: "/profile",
            state: {
                defaultAccessToken: this.state.defaultAccessToken

            }
        })
    }
    onSearchChangeListener = event => {
        this.state.posts = []


        var enteredvalue = event.target.value;
        var keys = Object.keys(this.state.backupposts);

        for (var i = 0; i < this.state.backupposts.length; i++) {
            var key = (keys[i]);
            console.log(enteredvalue)

            if (this.state.backupposts[key].caption.text.toLowerCase().includes(enteredvalue.toLowerCase())) {
                console.log(this.state.backupposts[key])

                this.state.posts.push(this.state.backupposts[key])

            }
        }
        this.setState({posts: this.state.posts})

    }

    componentDidMount() {
        console.log(this.props.title)
    }

    componentWillMount() {
        this.state.defaultAccessToken=this.props.location.state.defaultAccessToken
        this.setState({isUserLoggedIn: "true"})
        let list = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({posts: JSON.parse(this.responseText).data});
                that.setState({backupposts: JSON.parse(this.responseText).data});

            }
        })

        if (this.props.location.state == undefined) {
            this.props.history.push({
                pathname: "/",
                state: {
                    defaultAccessToken: this.state.defaultAccessToken

                }
            })
            return
        }
        let url = this.props.baseUrl + "media/recent?access_token=" + this.props.location.state.defaultAccessToken
        console.log("url" + url);
        xhr.open("GET", this.props.baseUrl + "media/recent?access_token=" + this.props.location.state.defaultAccessToken);
        xhr.send(list);


    }

    commentOnChangeHandler = event => {
        this.setState({addCommentField: event.target.value});
    }

    onLogoutHandler = () => {
        console.log("onLogoutHandler")
    }

    avatarClick = () => {
        console.log("avatarClick")

    }

    formatDate = (created_time) => {
        var timestamp = new Date(created_time * 1000).getTime();
        var todate = new Date(timestamp).getDate();
        var tomonth = new Date(timestamp).getMonth() + 1;
        var toyear = new Date(timestamp).getFullYear();
        var hours = new Date(timestamp).getHours();
        var mins = new Date(timestamp).getMinutes();
        var seconds = new Date(timestamp).getSeconds();
        var original_date = tomonth + '/' + todate + '/' + toyear + " " + hours + ":" + mins + ":" + seconds;
        return original_date;


    }

    renderHashtags = (stringarray) => {
        var str = "";

        stringarray.map((item, key) =>
            str += "#" + item + " "
        );


        return str;
    }

    returnDiv(comment) {
        if (comment != undefined)
            return (

                <ul>
                    {comment.map((item, index) => (
                        <li>{item}</li>
                    ))}

                </ul>
            );

    }

    displayFavIcon = (user_has_liked) => {
        if (user_has_liked)
            return <FavoriteIcon className="redcolor"></FavoriteIcon>
        else
            return <FavoriteBorderIcon></FavoriteBorderIcon>

    }

    addCommentHandler = (post, comment) => {

        console.log(comment);

        var keys = Object.keys(this.state.posts);

        for (var i = 0; i < this.state.posts.length; i++) {
            var key = (keys[i]);
            if (post.id == this.state.posts[key].id) {
                this.state.commentsection.push(this.state.posts[key].commentsectionpost)
                this.state.posts[key].commentsectionpost.push(comment);
                //this.state.posts[key].commentsectionpost = this.state.commentsection;
                console.log(this.state.posts[key].commentsectionpost)
                this.setState({commentsection: []})

            }


        }
        this.setState({posts: this.state.posts})
        console.log(this.state.posts)


    }

    likeClickHandler = (post) => {
        var keys = Object.keys(this.state.posts);

        for (var i = 0; i < this.state.posts.length; i++) {
            var key = (keys[i]);
            if (post.id == this.state.posts[key].id) {
                var count = this.state.posts[key].likes.count;
                if (this.state.posts[key].user_has_liked) {
                    this.state.posts[key].likes.count = count - 1;
                    this.state.posts[key].user_has_liked = false;
                } else {
                    this.state.posts[key].likes.count = count + 1;
                    this.state.posts[key].user_has_liked = true;
                }


                this.setState({posts: this.state.posts})
            }


        }

    }

    updateProfilePicture = (post) => {
        {
            this.state.profile_picture = post.user.profile_picture
        }

    }

    render() {
        const {classes} = this.props;


        return (
            <div>
                <Header profilePicture={this.state.profile_picture} isUserLoggedIn={this.state.isUserLoggedIn}
                        defaultAccessToken={this.props.location.state.defaultAccessToken}
                        onChanged={this.onSearchChangeListener} onMyProfileClickHandler={this.openMyProfile}
                        onLogoutClickHandler={this.onLogoutHandler}/>

                <div className="grid-layout">
                    <Grid
                        container spacing={2}
                        direction="row"
                        justify="center"
                        alignItems="flex-start">


                        {this.state.posts.map(post => (


                            <Card className="card-layout">

                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" src={post.user.profile_picture}>
                                        </Avatar>
                                    }
                                    title={post.user.username}
                                    subheader={this.formatDate(post.created_time)}
                                />
                                <CardContent style={{paddingBottom: 0}}>

                                    <img className="image-content"

                                         src={post.images.standard_resolution.url}
                                         alt="img"
                                    />
                                    <hr className="hr-line"></hr>


                                    <div>
                                        {
                                            post.caption.text
                                        }
                                    </div>
                                    <div className="hashtags">
                                        {this.renderHashtags(post.tags)}
                                    </div>
                                </CardContent>
                                <CardActions style={{paddingTop: 0}}>
                                    <IconButton aria-label="add to favorites"
                                                onClick={this.likeClickHandler.bind(this, post)}>
                                        {this.displayFavIcon(post.user_has_liked)}
                                    </IconButton>
                                    {post.likes.count} likes
                                </CardActions>
                                {this.returnDiv(post.commentsectionpost)}

                                {this.updateProfilePicture(post)
                                }
                                {/*  <ul>
                                   <li>{post.commentsectionpost}</li>
                                </ul>*/}
                                <div className="add-comment">
                                    <TextField className="add-comment-input" id="standard-basic" label="Add a comment"
                                               onChange={this.commentOnChangeHandler}/>

                                    <Button variant="contained" color="primary" style={{marginTop: 10, marginLeft: 10}}
                                            onClick={this.addCommentHandler.bind(this, post, this.state.addCommentField)}>
                                        ADD
                                    </Button>
                                </div>


                            </Card>

                        ))}


                    </Grid>

                </div>


            </div>


        )
    }


}

export default Home;