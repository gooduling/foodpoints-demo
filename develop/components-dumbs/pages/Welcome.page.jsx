import React, { Component, PropTypes } from 'react';
import SignIn from '../welcome/AuthFormWrapper.jsx';
import { Link } from 'react-router';

class WelcomePage extends Component {

    render() {
        const {isLogged} = this.props;
        return (
            <div className="wellcomePage">
                {isLogged ?
                    <div className="welcomeButtonsWrapper">
                        <Link className="button hugeBtn" to="/foodpoints">Find place to Eat</Link>
                        <br/>
                        <Link className="button hugeBtn" to="/findpeople">Find people to Eat</Link>
                    </div> :
                    <SignIn {...this.props}/>
                }
                <PromoArticle/>
            </div>
        );
    }
}

WelcomePage.propTypes = {
    isLogged: PropTypes.bool
};

export default WelcomePage;

const PromoArticle = () => (
    <article className="promoArticle">
        <h4>Why eat together? Lorem Ipsum</h4>
        <p>Reason #1: Communication and Well-Being</p>
        <p>Reason #2: Model Manners (and more)</p>
        <p>Reason # 3: Expand Their World…One Food at a Time</p>
        <p>Reason #4: Nourish</p>
        <p>Reason #5: Become Self-Sufficient</p>
        <p>Reason #6: Prevent Destructive Behaviors</p>
        <p>Reason #7: Improve Grades</p>
        <p>Reason # 8: Save Money</p>
    </article>
);
