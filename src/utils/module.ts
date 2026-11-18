/**
 * Surge .sgmodule template generator for Header Rewrite authentication.
 */
export function generateSurgeModule(host: string, siteName: string = 'Link Redirect'): string {
  // Escape dots in host for regular expression
  const escapedHost = host.replace(/\./g, '\\.');

  return `#!name=Link Redirect Auth (${host})
#!desc=自动注入管理后台与 API 验证所需的 Authorization Header，实现管理员无感免密直连
#!arguments=Auth:鉴权Token(ADMIN_TOKEN)
#!system=macOS,iOS

[Header Rewrite]
# 先清理可能存在的 Authorization Header，彻底规避因多重注入导致的 400 Bad Request
^https?://${escapedHost}/(admin|api) header-del Authorization
# 匹配 /admin 管理后台与 /api 接口自动注入鉴权 Bearer Token
^https?://${escapedHost}/(admin|api) header-add Authorization "Bearer {{{Auth}}}"

[MITM]
hostname = %APPEND% ${host}
`;
}
