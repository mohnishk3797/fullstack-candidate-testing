import React from 'react';

const MAX_DEFAULT_EXPAND = 10;

export default class Filter extends React.Component {
  state = {
    showAllOptions: false,
  };

  humanize(snake_case_string) {
    return snake_case_string.replace(/_/, ' ');
  }

  toggleShowAll = () => {
    this.setState({ showAllOptions: !this.state.showAllOptions });
  };

  renderToggle() {
    if (this.props.options.length > MAX_DEFAULT_EXPAND) {
      return (
        <div className="mt-1 block text-blue-500 cursor-pointer" onClick={this.toggleShowAll}>
          {this.state.showAllOptions ? 'Show less' : 'Show more' }
        </div>
      );
    }
  }

  render() {
    return (
      <div className="bg-white p-4">
        <div className="filter-title uppercase font-bold">
          {this.humanize(this.props.field_name)}
        </div>
        <div className="filter-options cursor-pointer">
          {this.props.options.map((opt, i) => {
            if (i < MAX_DEFAULT_EXPAND || this.state.showAllOptions) {
              return (
                <div className="mt-1 space-x-2 block" key={opt.key} onClick={this.props.onFilter(opt.key)}>
                  <span className={this.props.activeFilterValue === opt.key ? 'text-pink-500' : ''}>{opt.key}</span>
                  <span className="text-gray-400 text-sm">{opt.doc_count.toLocaleString()}</span>
                </div>
              );
            }
          })}
        </div>
        {this.renderToggle()}
      </div>
    );
  }
}
