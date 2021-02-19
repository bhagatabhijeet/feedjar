<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:ipaws="urn:oasis:names:tc:emergency:cap:1.2"
>

  <xsl:template match="/">
    <html>
      <body>
        <h2>Alerts</h2>
        <table border="1">
          <tr bgcolor="#9acd32">
            <th>Sender</th>
            <th>Status</th>
          </tr>
          <xsl:for-each select="/alerts/alert">
            <tr>
              <td>
                <xsl:value-of select="ipaws:sender" />
              </td>
              <td>
                <xsl:value-of select="ipaws:status" />
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>