export const uploadFileToOSS = async (file: File): Promise<string> => {
  const res = await fetch("/api/oss/policy");
  if (!res.ok) throw new Error("Failed to get OSS policy");

  const { host, policy, signature, OSSAccessKeyId, key } = await res.json();

  const formData = new FormData();

  const safeFileName = file.name
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "");

  const fileKey = key.replace("${filename}", safeFileName);

  formData.append("key", fileKey);
  formData.append("policy", policy);
  formData.append("OSSAccessKeyId", OSSAccessKeyId);
  formData.append("success_action_status", "200");
  formData.append("signature", signature);
  formData.append("file", file);

  console.log("Uploading to host:", host);

  const uploadRes = await fetch(host, {
    method: "POST",
    body: formData,
  });

  if (uploadRes.ok) {
    return `${host}/${fileKey}`;
  }

  throw new Error("OSS Upload Failed");
};
