import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";

class PaginationLinks extends React.Component {
  render() {
    const { handlePageChange, paginationPath, totalListItems, activePage } =
      this.props;

    return (
      <div className="ui pagination content">
        <div className="row">
          <div className="col-md-8">
            <div className="align-left">
              <Pagination
                innerClass="pagination posts"
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={5}
                totalItemsCount={totalListItems}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                getPageUrl={(i) => `${paginationPath}/${i}`}
                prevPageText="&lsaquo;"
                nextPageText="&rsaquo;"
                firstPageText="&laquo;"
                lastPageText="&raquo;"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PaginationLinks.defaultProps = {};

PaginationLinks.propTypes = {
  totalListItems: PropTypes.number.isRequired,
  paginationPath: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default PaginationLinks;
