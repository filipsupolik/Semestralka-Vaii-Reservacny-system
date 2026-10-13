import ActionButton from "./ActionButton";

function OwnerDashboardActions({
  selectedProject,
  onNew,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="flex items-center gap-[15px]">
      <ActionButton
        size="compact"
        disabled={selectedProject !== null}
        onClick={onNew}
      >
        New
      </ActionButton>
      <ActionButton
        size="compact"
        disabled={!selectedProject}
        onClick={onUpdate}
      >
        Update
      </ActionButton>
      <ActionButton
        size="compact"
        disabled={!selectedProject}
        onClick={onDelete}
      >
        Delete
      </ActionButton>
    </div>
  );
}

export default OwnerDashboardActions;
