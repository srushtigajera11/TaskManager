module.exports = function taskAssignedTemplate({
  taskId,
  title,
  description,
  priority,
  assignedBy,
  reportTo,
  status,
  projectName,
  assignedAt
}) {
  return `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      
      <div style="background:#4f46e5; color:white; padding:15px 20px;">
        <h2 style="margin:0;">New Task Assigned</h2>
      </div>

      <div style="padding:20px;">
        <p>Hello,</p>
        <p>You have been assigned a new task. Please find the details below:</p>

        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="padding:8px; font-weight:bold;">Task ID:</td>
            <td>${taskId}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Title:</td>
            <td>${title}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Description:</td>
            <td>${description}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Priority:</td>
            <td>${priority}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Assigned By:</td>
            <td>${assignedBy}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Report To:</td>
            <td>${reportTo}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Status:</td>
            <td>${status}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Project:</td>
            <td>${projectName}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Assigned At:</td>
            <td>${assignedAt}</td>
          </tr>
        </table>

        <p style="margin-top:20px;">
          Please login to the system to start working on the task.
        </p>
      </div>

      <div style="background:#f1f1f1; padding:12px; text-align:center; font-size:12px;">
        Task Management System
      </div>

    </div>
  </div>
  `;
};