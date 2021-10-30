import * as React from 'react';
import {IHeaderProps} from "./types/IHeaderProps";
import './Header.css';

class TodoHeader extends React.Component<IHeaderProps, {}> {

    constructor(props: IHeaderProps, context: any) {
        super(props, context);
    }


    public render() {
        return (
            <h1 className="header">Todo App {this.props.name}</h1>
        );
    }
}

export default TodoHeader;