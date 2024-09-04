import { Button, Chip, TextField } from "@mui/material";

interface RenderTagsProps {
  type: string | undefined;
  editedTags: string[];
  editedUniqueTags: string[];
  tags: string[];
  setTags: (tags: string[]) => void;
  allTags: string[];
  addTag: (tags: string, type?: string) => void;
  setEditedTags: (tags: string[]) => void;
  handleTagDelete: (tag: string, type?: string) => void;
}

const RenderTags = ({
  type,
  editedTags,
  editedUniqueTags,
  setEditedTags,
  tags,
  setTags,
  allTags,
  addTag,
  handleTagDelete,
}: RenderTagsProps) => {
  return (
    <div>
      <TodoTags
        type={type!!}
        editedTags={editedTags}
        editedUniqueTags={editedUniqueTags}
        tags={tags}
        setTags={setTags}
        allTags={allTags}
        addTag={addTag}
        handleTagDelete={handleTagDelete}
        setEditedTags={setEditedTags}
      />
    </div>
  );
};

export default RenderTags


interface TodoTagsProps {
  tags: string[];
  allTags: string[];
  editedTags: string[];
  editedUniqueTags: string[];
  type: string;
  setTags: (tags: string[]) => void;
  setEditedTags: (tags: string[]) => void;
  addTag: (tags: string, type?: string) => void;
  handleTagDelete: (tag: string, type?: string) => void;
}

const TodoTags = ({ tags, type, editedTags, setTags, setEditedTags, addTag, handleTagDelete,
  editedUniqueTags, allTags
}: TodoTagsProps) => {


  return (
    <div>
      <div>
        <span>{type === "edit" ? "Edit" : "Add"} Tags</span> <br />
        <small>Separate tags with commas</small>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`${type === "edit" ? "Edit" : "Add"} Tags`}
            type="text"
            name="tags"
            value={type === "edit" ? editedTags : tags}
            onChange={(e) => {
              if (type === "edit") {
                setEditedTags(e.target.value.toLocaleLowerCase().split(","));
              } else {
                setTags(e.target.value.toLocaleLowerCase().split(","));
              }
            }}
          />
          <Button
            onClick={() => {
              if (type === "edit") {
                addTag(tags.join(","), "edit");
              } else {
                addTag(tags.join(","), "create");
              }
            }}
            sx={{
              marginLeft: "1rem",
              width: "auto",
              height: "3.5rem",
            }}
            type="button"
          >
            {type === "edit" ? "Update" : "Add"}
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            width: "380px",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {type === "edit" ? (
            <>
              {editedUniqueTags.some((tag) => tag.trim() !== "") && (
                <small
                  style={{
                    width: "auto",
                    cursor: "pointer",
                  }}
                >
                  Tags: {editedUniqueTags.join(", ")} <br />
                  {editedUniqueTags.map((tag) => (
                    <small key={tag}>
                      <Chip
                        onDelete={() => {
                          handleTagDelete(tag, "edit");
                        }}
                        sx={{ margin: ".2rem" }}
                        variant="outlined"
                        label={tag}
                      />
                    </small>
                  ))}
                </small>
              )}
            </>
          ) : (
            <>
              {allTags.some((tag) => tag.trim() !== "") && (
                <small
                  style={{
                    width: "auto",
                    cursor: "pointer",
                  }}
                >
                  Tags: {allTags.join(", ")} <br />
                  {allTags.map((tag) => (
                    <small key={tag}>
                      <Chip
                        onDelete={() => handleTagDelete(tag, "create")}
                        sx={{ margin: ".2rem" }}
                        variant="outlined"
                        label={tag}
                      />
                    </small>
                  ))}
                </small>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
  
}