import React from 'react';

class SearchField extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value === null) this.onClear()
    }

    onChange(event) {
        const { value } = event.target;
        const { type } = this.props;

        this.setState({value})
    }

    onClear() {
        this.setState({ value: '' });
        this.props.onChange('');
    }

    render() {
        const { placeholder, style } = this.props;
        const { value } = this.state;
        const isStyleMap = style === 'map';

        return (
            <div className={isStyleMap ? 'search-field-map': 'search-field'}>
                {
                    value &&
                    <button
                    className={isStyleMap ? 'search-field-map-close' : 'search-field-close'}
                    onClick={this.onClear}
                    >
                        Clear
                    </button>
                }
                {
                    isStyleMap ? 
                    <input
                    className="search-field-map-input"
                    value={value}
                    placeholder={placeholder}
                    onChange={this.onChange}
                    />
                    :
                    <textarea
                    className="search-field-input"
                    value={value}
                    placeholder={placeholder}
                    onChange={this.onChange}
                    />
                }
            </div>
        )
    }
}

export default SearchField