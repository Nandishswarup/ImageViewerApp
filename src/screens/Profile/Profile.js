import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import Header from "../../common/header/header";
import {Avatar} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "./Profile.css"
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {Card, colors} from '@material-ui/core';
import {CardHeader} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ReactModal from 'react-modal';
import {bindTrigger} from "material-ui-popup-state";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    AvatarDiv: {
        backgroundColor: "red",
        width: 150,
        height: 150,
        display: 'flex'

    },
    margin: {
        margin: theme.spacing(1),
    },
    updateButton: {
        margin_top: 20

    },

});

class Profile extends Component {


    constructor(props) {
        super(props);

        this.state = {
            imageDetailModal: false,
            showModal: false,
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
            selectedPost: [{
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
            profile: {
                counts: {}
            },
            updateName: "",

        }
    }


    componentWillMount() {
        this.setState({isUserLoggedIn: "profile"})
        let list = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({posts: JSON.parse(this.responseText).data});


            }
        })
        let url = this.props.baseUrl + "media/recent?access_token=" + this.props.location.state.defaultAccessToken
        console.log("url" + url);
        xhr.open("GET", url);
        xhr.send(list);


        let profile = null;
        let xhrprofile = new XMLHttpRequest();
        xhrprofile.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({profile: JSON.parse(this.responseText).data});
                console.log(that.state.profile)


            }
        })
        let urlprofile = this.props.baseUrl + "?access_token=" + this.props.location.state.defaultAccessToken
        console.log("urlprofile" + urlprofile);
        xhrprofile.open("GET", urlprofile);
        xhrprofile.send(profile);


        if (this.props.location.state == undefined) {
            this.props.history.push({
                pathname: "/",
                state: {
                    accessToken: this.state.accessToken,
                    defaultAccessToken: this.state.defaultAccessToken

                }
            })
            return
        }


    }


    displayFavIcon = (user_has_liked) => {
        if (user_has_liked)
            return <FavoriteIcon className="redcolor"></FavoriteIcon>
        else
            return <FavoriteBorderIcon></FavoriteBorderIcon>

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
    onNameChangeHandler = (event) => {
        this.setState({updateName: event.target.value});
    }


    handleOpenModal = () => {
        //this.state.showModal=true;
        this.setState({showModal: true});
    }

    handleCloseModal = () => {
        //this.state.showModal=false;
        this.state.profile.full_name = this.state.updateName

        this.setState({showModal: false});
    }
    openImageDetailModal = (post) => {
        this.setState({selectedPost:post})
        if(post!=null) {
            console.log("post not null")

            this.setState({imageDetailModal: true});
        }

    }
    closeImageDetailModal = (post) => {
        this.setState({imageDetailModal: false});


    }
    renderHashtags = (stringarray) => {
        var str = "";

        stringarray.map((item, key) =>
            str += "#" + item + " "
        );


        return str;
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
    showImageDetailModel=(stateModel)=>
    {
        if(stateModel==true)
        return(
           /* <ReactModal
                isOpen={stateModel}
                contentLabel="Minimal Modal Example"
                className="imageDetailModel">
                <div className="image-detai-bg">
                    <img className="image-detail" src={this.state.selectedPost.images.standard_resolution.url}/>
                    <div className="modal-header">
                        <div className="avatar">
                            <Avatar alt="P"
                                    src={this.state.selectedPost.user.profile_picture}/>
                        </div>
                        <span className="modal-username">{this.state.selectedPost.user.username}</span>

                    </div>

                </div>
            </ReactModal>*/
            <ReactModal
                isOpen={stateModel}
                contentLabel="Minimal Modal Example"
                className="imageDetailModel">
                <div className="row">
                    <img className="image-detail" src={this.state.selectedPost.images.standard_resolution.url}/>
                    <div className="column">
                        <div className="avatar">
                            <Avatar alt="P"
                                    /*src={this.state.selectedPost.user.profile_picture}/>*/
                                    src="https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"/>

                        </div>
                        <span className="modal-username">{this.state.selectedPost.user.username}</span>

                    </div>
                    <hr className="model-content-data"></hr>
                    <div className="model-content-data"> {this.state.selectedPost.caption.text}</div>
                    <div className="model-content-data"> {this.renderHashtags(this.state.selectedPost.tags)}</div>

                    <div className="model-content-like">

                    </div>

                    <div className="alignbottom">


                        <IconButton aria-label="add to favorites"
                                    onClick={this.likeClickHandler.bind(this, this.state.selectedPost)}>
                            {this.displayFavIcon(this.state.selectedPost.user_has_liked)}
                        </IconButton>
                        {this.state.selectedPost.likes.count} likes





                        <div className="add-comment-input-parent">

                        <TextField className="add-comment-input" id="standard-basic" label="Add a comment"
                                   onChange={this.commentOnChangeHandler}/>

                        <Button variant="contained" color="primary" style={{marginTop: 10, marginLeft: 10}}
                                onClick={this.addCommentHandler.bind(this, this.state.selectedPost, this.state.addCommentField)}>
                            ADD
                        </Button>
                        </div>
                        </div>


                </div>
            </ReactModal>
        );
    }


    render() {
        const {classes} = this.props;


        return (
            <div>
                <Header profilePicture={this.state.profile.profile_picture} isUserLoggedIn={this.state.isUserLoggedIn}
                        defaultAccessToken={this.props.location.state.defaultAccessToken}
                        onChanged={this.onSearchChangeListener} onMyProfileClickHandler={this.openMyProfile}
                        onLogoutClickHandler={this.onLogoutHandler}/>

                <div className="parentcontainer">
                    <div className="top-container">
                        <div className="user-image">

                            <Avatar alt="P"
                                    src={this.state.profile.profile_picture}
                                    className={classes.AvatarDiv}
                            />


                        </div>
                        <span className="profile-info">

                    <span className="username">{this.state.profile.username}</span>
                        <span className="profile-counts">
                        <span>Posts: {this.state.profile.counts.media}</span>
                        <span>Follows: {this.state.profile.counts.follows}</span>
                        <span>Followed By: {this.state.profile.counts.followed_by}</span>

                        </span>
                        <span className="fullname">{this.state.profile.full_name}
                            <Fab size="medium" color="secondary" aria-label="edit" className={classes.margin}
                                 onClick={this.handleOpenModal.bind(this)}>
                         <EditIcon/>
                          </Fab>
                             <ReactModal
                                 isOpen={this.state.showModal}
                                 contentLabel="Minimal Modal Example"
                                 className="Modal">
                                 <div className="edit-modal">Edit</div>
                                    <TextField className="update_name-input" id="standard-basic" label="Full Name *"
                                               onChange={this.onNameChangeHandler}/>
                                <div className="update_button">
                                 <Button variant="contained" color="primary"
                                         onClick={this.handleCloseModal.bind(this)}>UPDATED</Button>
                                 </div>
                             </ReactModal>
                            {this.showImageDetailModel(this.state.imageDetailModal)}

                         </span>

                    </span>

                    </div>
                </div>

                <div>
                    <div className="grid-layout">
                        <Grid
                            container spacing={3}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start">


                            {this.state.posts.map(post => (


                                <span>
                                <img className="image-content"

                                     src={post.images.standard_resolution.url}
                                     alt="img"
                                     onClick={this.openImageDetailModal.bind(this, post)}>
                                </img>
                                  {/*  <ReactModal
                                        isOpen={this.state.imageDetailModal}
                                        contentLabel="Minimal Modal Example"
                                        className="imageDetailModel">
                                <div className="image-detai-bg">
                                 <img className="image-detail" src={post.images.standard_resolution.url}/>
                                <div>
                                <img src={post.user.profile_picture}>
                                </img>
                                    {post.user.username}
                                </div>
                                 </div>

                             </ReactModal>*/}

                                </span>
                            ))}


                        </Grid>

                    </div>


                </div>


            </div>


        )
    }


}

export default withStyles(styles)(Profile);