import { PREFIX } from "./constants";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { background, ChakraProvider, extendBaseTheme } from "@chakra-ui/react";
import theme from "../../theme.js";
import "regenerator-runtime/runtime";

export default class Question {
  constructor(init, lrnUtils) {
    this.init = init;
    this.events = init.events;
    this.lrnUtils = lrnUtils;
    this.el = init.$el.get(0);
    this.componentStates = {}; // object to store React component states

    this.render().then(() => {
      this.registerPublicMethods();
      this.registerEventsListener();

      /**
       * @param { String } init.state - the state of Questions API.
       * state can be any of the following 3 strings
       * "initial" for first starting the assessment,
       * "resume" for coming back to a previously started assessment,
       * "review" for showing the completed assessment and results to the learner or teacher
       */

      //   if (init.state === "resume") {
      /**
       * If you want your custom question to support resume state
       * (For a learner to be able to come back to your question in a future sitting after having previously started and saved the assessment),
       * then make make sure to update your question's UI to display the previously saved response Questions API has stored in the back end.
       */
      // EXAMPLE implementation:
      // if(init.response) {
      //     // This example assumes a simple DOM input for the custom question's UI, and updates its value to the value of the saved response upon resume.
      //     document.getElementById('my-input').value = init.response.value;
      // }
      //   }

      if (init.state === "review") {
        /**
         * If you want your custom question to support review state
         * (For a learner or instructor to be able to view their results in a read-only mode after having completed and submitted the assessment),
         * then make make sure to update your question's UI to display the previously submitted response Questions API has stored in the back end.
         * NOTE: this is required if you intend to use Reports API with your custom question (for example the session-detail-by-item report).
         */

        // EXAMPLE implementation:
        // if(init.response) {
        //     // This example assumes a simple DOM input for the custom questions UI, and updates its value to the value of the submitted response upon review.
        //     document.getElementById('my-input').value = init.response.value;
        // }

        /**
         * below, we call the disable public method on the custom question to display it in a read-only mode
         * to learners and/or instructors viewing the completed results.
         * (Please see this.registerPublicMethods below for more detials about the .disable() method, including an example implementation)
         */
        init.getFacade().disable();
      }

      init.events.trigger("ready");
    });
  }

  render() {
    const { el, init, lrnUtils } = this;
    // const { question, response } = init;

    // TODO: Requires implementation
    el.innerHTML = `
            <div class="${PREFIX} lrn-response-validation-wrapper">
                <div class="lrn_response_input">
                    // Requires implementation - YOUR CONTENT GOES IN HERE
                    // This element is the hook into which your custom question's UI should be rendered.
                </div>            
                <div class="${PREFIX}-checkAnswer-wrapper"></div>
                <div class="${PREFIX}-suggestedAnswers-wrapper"></div>
            </div>
        `;

    // Optional - Render optional Learnosity components like Check Answer Button, Suggested Answers List
    // first before rendering your question's components
    return Promise.all([
      lrnUtils.renderComponent(
        "SuggestedAnswersList",
        el.querySelector(`.${PREFIX}-suggestedAnswers-wrapper`)
      ),
      lrnUtils.renderComponent(
        "CheckAnswerButton",
        el.querySelector(`.${PREFIX}-checkAnswer-wrapper`)
      ),
      // ]).then(([suggestedAnswersList]) => {
      // suggestedAnswersList is a wrapped function to render suggested answer
      // this.lrnComponents = {
      //     suggestedAnswersList
      // };

      // const reactDomContainer = el.querySelector('.lrn_response_input');

      // this.reactRoot = ReactDOM.createRoot(reactDomContainer);
      // this.renderComponent();
    ]).then(() => {
      // TODO - Requires implementation
      /**  The logic to render the UI of your custom question should go here.
       *
       * For example this might be a call to a function or instantiation of a class to render your UI component(s).
       *
       */
      const reactDomContainer = el.querySelector(".lrn_response_input");
      this.reactRoot = ReactDOM.createRoot(reactDomContainer);
      console.log("Start rendering");
      this.renderComponent();
      console.log("Rendered component");
    });
  }

  //Add for react - Zelda
  renderComponent(options = {}) {
    const { reactRoot } = this;

    // Manage React component states
    Object.assign(this.componentStates, options);

    reactRoot.render(
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </React.StrictMode>
    );
  }

  /**
   * Add public methods to the created question instance that is accessible during runtime
   *
   * Example: questionsApp.question('my-custom-question-response-id').myNewMethod();
   *
   */
  registerPublicMethods() {
    const { init } = this;
    // Attach the methods you want on this object
    const facade = init.getFacade();

    facade.disable = () => {
      // TODO: Requires implementation
      /**
       * The purpose of this method is to prevent learner interaction with your question's UI.
       *
       * If you plan to display your custom question in "review" state, then you need to implement this
       * method to prevent a learner or instructor who is reviewing their completed results from being able to change the responses in your question UI.
       */
      // EXAMPLE implementation
      // document.getElementById('my-input').setAttribute('disabled', true)
      // const inputs = this.el.querySelectorAll(
      //   "input, button, textarea, select"
      // );
      // inputs.forEach((input) => (input.disabled = true));
      console.log("Question has been disabled."); // Logging for debug purposes
    };
    facade.enable = () => {
      /**
       * The purpose of this method is to re-enable learner interaction with your question's UI
       * after it has been previously disabled.
       *
       * (For example, you plan to temporarily disable the question UI for a student taking the assessment until they complete another task like spend a set time reading the instructions.)
       */
      // EXAMPLE implementation
      // document.getElementById('my-input').removeAttribute('disabled')
      // const inputs = this.el.querySelectorAll(
      //   "input, button, textarea, select"
      // );
      // inputs.forEach((input) => (input.disabled = false));
      console.log("Question has been enabled.");
    };
    facade.resetResponse = () => {
      /**
       * The purpose of this method is to support removal of a previously entered response to your custom question
       * and restoring the question to its initial blank state before a response was entered.
       * (For example, in a multiple choice question where a student has picked a choice, you reset the question so that no choices are picked at all.)
       */
      // TODO: Requires implementation, you could use the following steps
      // trigger a 'resetResponse' event to reset the value of response
      // this.events.trigger('resetResponse');
      // reset other states if you need
      // re-render the component, manage the 'reset' state by yourself

      // For example, resetting a text input:
      // const inputs = this.el.querySelectorAll('input, textarea');
      // inputs.forEach(input => input.value = '');
      // console.log("Question responses have been reset."); // Logging for debug purposes
      // Trigger a 'resetResponse' event to inform Learnosity that the question has been reset.
      this.events.trigger("resetResponse");
    };
    facade.showValidationUI = () => {
      // TODO: requires implementation
      /**
       * The purpose of this method is to update your custom question's UI with visual feedback
       * after the learner presses the Check Answer button.
       *
       * The following is an example implementation that shows the standard Learnosity "checkmark / tick" for a correct answer
       * or the standard Learnosity "x mark / cross" for an incorrect answer.
       */
      // EXAMPLE implemetation:
      // const answerIsCorrect = facade.isValid();
      // /**
      //  * update the UI based on the result
      //  * IMPORTANT: In both cases we need to target the element with the classname lrn_response_input
      //  */
      // if (answerIsCorrect) {
      //     /** if the answer is correct we will add the Learnosity utility class lrn_correct, which will automatically show the Learnosity
      //      * checkmark (tick) you are used to on regular Learnosity quesiton types
      //      */
      //     el.querySelector(".lrn_response_input").classList.add("lrn_correct");
      // } else {
      //     /** if the answer is incorrect we will add the Learnosity utility class lrn_incorrect, which will automatically show the Learnosity
      //      * x (cross) you are used to on regular Learnosity quesiton types
      //      */
      //     el.querySelector(".lrn_response_input").classList.add("lrn_incorrect");
      // }
      console.log("yay");
    };
    facade.resetValidationUI = () => {
      // TODO: requires implementation
      /**
       * If you implement showValidationUI() above, then you need to implement this method also.
       *
       * If the user enters a response to your custom question, presses the Check Answer button, and then changes their response to something new,
       * you now need to remove the feedback UI that you had displayed for the previous response. This is exactly the purpose of this method.
       *
       * The following is an example implementation that removes the standard Learnosity validation UI ("checkmark / tick" if the previous response was correct
       * or "x mark / cross" if the previous response was incorrect).
       */
      // Example implementation:
      // // we will remove the Learnosity checkmark or x previously showing
      // el.querySelector(".lrn_response_input").classList.remove("lrn_correct");
      // el.querySelector(".lrn_response_input").classList.remove("lrn_incorrect");
      // // if we chose to also display the correct answer, we will now remove the display of the correct answer as well by
      // // leveraging the suggestedAnswersList.reset() method.
      // this.suggestedAnswersList.reset()
      console.log("Validation UI reset.");
    };
  }
  /**
   * add any events listener
   *
   * Example: onValidateHandler() to listen to events.on('validate')
   */
  registerEventsListener() {
    this.onValidateListener();
  }
}
