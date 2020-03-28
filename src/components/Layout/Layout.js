import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import SignIn from '../Authorization/SignIn/SignIn';
import SignUp from '../Authorization/SignUp/SignUp';
import Tasks from '../Tasks/Tasks';
import CreateTask from '../Task/CreateTask/CreateTask';
import EditTask from '../Task/EditTask/EditTask';
import Navigation from '../UI/Navigation/Navigation';
import ModalSpinner from '../UI/Modals/ModalSpinner/ModalSpinner';
import { autoLogin } from '../../utility/auto-login';
import { signInLocalAction, refreshTokenAction } from '../../store/actions/authorization';
import { finishLoadingActionCreator } from '../../store/actions/authorization';
import { connectSocketActionCreator } from '../../store/actions/socket';

const Layout = (props) => {
    useEffect(() => {
        autoLogin(props.refreshTokenAndSignIn, props.signInByLocalData, props.finishLoading);
        props.connectSocket();
    }, [])

    if (props.loading) return <ModalSpinner />;
    return (
        <React.Fragment>
            <Navigation />
            <Switch>
                <Route path={'/create-task'} component={CreateTask} exact />
                <Route path={'/edit-task'} component={EditTask} exact />
                <Route path={'/sign-in'} component={SignIn} exact />
                <Route path={'/sign-up'} component={SignUp} exact />
                <Route path={'/'} component={Tasks} />
            </Switch>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signInByLocalData: () => { dispatch(signInLocalAction()) },
        refreshTokenAndSignIn: (token) => { dispatch(refreshTokenAction(token)) },
        finishLoading: () => { dispatch(finishLoadingActionCreator()) },
        connectSocket: () => { dispatch(connectSocketActionCreator()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
