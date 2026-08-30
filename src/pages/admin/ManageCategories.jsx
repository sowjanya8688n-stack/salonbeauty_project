// 
import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/axios";

import "./styles/ManageCategories.css";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.log("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      await api.post("/categories", {
        name: name.trim(),
      });

      setName("");

      loadCategories();
    } catch (error) {
      console.log("Error adding category:", error);
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/categories/${id}`);

      loadCategories();
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="categories-layout">
      <AdminSidebar />

      <main className="categories-page">

        <div className="categories-header">

          <div>
            <p className="categories-label">
              ADMIN PANEL
            </p>

            <h1>Manage Categories</h1>

            <p className="categories-subtitle">
              Create and manage service categories such as Hair, Skin,
              Makeup, Nails and Spa.
            </p>
          </div>

          <div className="categories-count-card">

            <div className="categories-count-icon">
              🏷️
            </div>

            <div>
              <p>Total Categories</p>

              <h2>
                {categories.length}
              </h2>
            </div>

          </div>

        </div>

        <div className="category-form-card">

          <div className="category-form-title">
            <h2>Add New Category</h2>

            <p>
              Add a category that can be used for salon services.
            </p>
          </div>

          <form
            className="category-form"
            onSubmit={addCategory}
          >

            <div className="category-input-group">

              <label>
                Category Name
              </label>

              <input
                type="text"
                placeholder="Example: Hair Care"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="category-add-btn"
            >
              + Add Category
            </button>

          </form>

        </div>

        <div className="categories-toolbar">

          <div className="categories-search-box">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <button
            className="categories-refresh-btn"
            onClick={loadCategories}
          >
            ↻ Refresh
          </button>

        </div>

        {loading ? (
          <div className="categories-loading">
            Loading categories...
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="categories-empty">

            <div className="categories-empty-icon">
              🏷️
            </div>

            <h2>No Categories Found</h2>

            <p>
              Add your first salon category using the form above.
            </p>

          </div>
        ) : (
          <div className="categories-grid">

            {filteredCategories.map((category, index) => (

              <div
                className="category-card"
                key={category.id}
              >

                <div className="category-card-top">

                  <div className="category-icon">
                    {index % 5 === 0
                      ? "✂️"
                      : index % 5 === 1
                      ? "✨"
                      : index % 5 === 2
                      ? "💄"
                      : index % 5 === 3
                      ? "💅"
                      : "🌸"}
                  </div>

                  <span className="category-id">
                    #{category.id}
                  </span>

                </div>

                <div className="category-card-body">

                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    Salon & beauty service category
                  </p>

                </div>

                <button
                  className="category-delete-btn"
                  onClick={() =>
                    deleteCategory(category.id)
                  }
                >
                  🗑 Delete Category
                </button>

              </div>

            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default ManageCategories;