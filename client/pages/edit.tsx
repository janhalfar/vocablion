import React from "react";
import { connect } from "react-redux";
import { Page, Title, Form } from "../components/components";
import { State } from "../store";
import { RadioBar } from "../components/RadioBar";
import { actionEditSet, actionEditReset } from "../actions";
import { GoConst } from "../services/vo/services";
import { EditorNoun } from "../components/editor/EditorNoun";
import { getClient } from "../transport";
import { ServiceClient } from "../services/edit";
import { EditState } from "../services/vo/edit";
import { EditorVerb } from "../components/editor/EditorVerb";
import { EditorAdjective } from "../components/editor/EditorAdjective";
import { EditorUnit } from "../components/editor/EditorUnit";
import { EditorAdverb } from "../components/editor/EditorAdverb";

const editorForType = (wordType: string) => {
  switch (wordType) {
    case GoConst.WordTypeNoun:
      return <EditorNoun />;
    case GoConst.WordTypeAdverb:
      return <EditorAdverb />;
    case GoConst.WordTypeVerb:
      return <EditorVerb />;
    case GoConst.WordTypeAdjective:
      return <EditorAdjective />;
    default:
      return <h2>Select a word type</h2>;
  }
};

interface EditProps extends EditState {
  setWordType: (wordType: string) => void;
}

class InternalEdit extends React.Component<EditProps> {
  static async getInitialProps(ctx) {
    ctx.reduxStore.dispatch(actionEditReset());
    const client = getClient(ServiceClient);
    if(typeof ctx.query.wordID == "string") {
      ctx.reduxStore.dispatch(actionEditSet( await client.loadWord(ctx.query.wordID)));
    } else {
      ctx.reduxStore.dispatch(actionEditSet( await client.newWord()));
    }
  
    return {};
  }
  render() {
    return (
      <Page>
        <Title>Edit</Title>
        <Form>
          <RadioBar
            onChangeSelection={s => {
              this.props.setWordType(s);
            }}
            options={[
              { label: "noun", value: GoConst.WordTypeNoun },
              { label: "verb", value: GoConst.WordTypeVerb },
              { label: "adjective", value: GoConst.WordTypeAdjective },
              { label: "adverb", value: GoConst.WordTypeAdverb },
            ]}
            selection={this.props.WordType}
          />
          {this.props.WordType != "" ? <EditorUnit /> : undefined}
          {editorForType(this.props.WordType)}
        </Form>
      </Page>
    );
  }
}

export default connect(
  (state: State) => state.edit,
  dispatch => ({
    setWordType: async (wordType: string) => {
      try {
        dispatch(
          actionEditSet(await getClient(ServiceClient).setType(wordType))
        );
      } catch (e) {
        console.error(e);
      }
    }
  })
)(InternalEdit);
