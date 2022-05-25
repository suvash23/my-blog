import React from "react";
import blog from "../apis/blog";
import BlogList from "./BlogList";

class App extends React.Component {
  state = { blogs: [], selectedBlog: null };

  componentDidMount() {
    this.onBlogLoad();
  }

  onBlogLoad = async () => {
    const response = await blog.get();

    this.setState({
      blogs: response.data.results,
      selectedBlog: response.data.results[0],
    });
  };

  onBlogSelect = (blog) => {
    this.setState({ selectedBlog: blog });
  };

  render() {
    return (
      <div className="ui masthead vertical segment">
        <div className="ui container">
          <div className="ui grid">
            <div className="ui row">
              <div className="eleven wide column">
                <BlogList
                  onBlogSelect={this.onBlogSelect}
                  blogs={this.state.blogs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
