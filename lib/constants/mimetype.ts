/**
 * List of content types commonly used. The complete list can be found in
 * {@link http://www.iana.org/assignments/media-types/media-types.xhtml|IANA - List of all oficial 
 * MIME Types}.
 *
 * hint: As the mime types list is huge and this file have just the most used portion, if a 
 * different string is needed, just create a new object with the corresponding mime type.
 */
export class MimeType {
  /**
    * AAC audio file
    */
  static aac: string = 'audio/aac';
  /**
   * AbiWord document
   */
  static abw: string = 'application/x-abiword';
  /**
   * Archive document (multiple files embedded)
   */
  static arc: string = 'application/octet-stream';
  /**
   * AVI: Audio Video Interleave
   */
  static avi: string = 'video/x-msvideo';
  /**
   * Amazon Kindle eBook format
   */
  static azw: string = 'application/vnd.amazon.ebook';
  /**
   * Any kind of binary data
   */
  static bin: string = 'application/octet-stream';
  /**
   * BZip archive
   */
  static bz: string = 'application/x-bzip';
  /**
   * BZip2 archive
   */
  static bz2: string = 'application/x-bzip2';
  /**
   * C-Shell script
   */
  static csh: string = 'application/x-csh';
  /**
   * Cascading Style Sheets (CSS)
   */
  static css: string = 'text/css';
  /**
   * Comma-separated values (CSV)
   */
  static csv: string = 'text/csv';
  /**
   * Microsoft Word
   */
  static doc: string = 'application/msword';
  /**
   * Electronic publication (EPUB)
   */
  static epub: string = 'application/epub+zip';
  /**
   * Graphics Interchange Format (GIF)
   */
  static gif: string = 'image/gif';
  /**
   * HyperText Markup Language (HTML)
   */
  static html: string = 'text/html';
  /**
   * Icon format
   */
  static icon: string = 'image/x-icon';
  /**
   * iCalendar format
   */
  static ics: string = 'text/calendar';
  /**
   * Java Archive (JAR)
   */
  static jar: string = 'application/java-archive';
  /**
   * JPEG images
   */
  static jpg: string = 'image/jpeg';
  /**
   * JavaScript (ECMAScript)
   */
  static js: string = 'application/js';
  /**
   * JSON format
   */
  static json: string = 'application/json';
  /**
   * Musical Instrument Digital Interface (MIDI)
   */
  static midi: string = 'audio/midi';
  /**
   * MPEG Video
   */
  static mpeg: string = 'video/mpeg';
  /**
   * Apple Installer Package
   */
  static mpkg: string = 'application/vnd.apple.installer+xml';
  /**
   * OpenDocument presentation document
   */
  static odp: string = 'application/vnd.oasis.opendocument.presentation';
  /**
   * OpenDocument spreadsheet document
   */
  static ods: string = 'application/vnd.oasis.opendocument.spreadsheet';
  /**
   * OpenDocument text document
   */
  static odt: string = 'application/vnd.oasis.opendocument.text';
  /**
   * OGG audio
   */
  static oga: string = 'audio/ogg';
  /**
   * OGG video
   */
  static ogv: string = 'video/ogg';
  /**
   * OGG
   */
  static ogx: string = 'application/ogg';
  /**
   * Default value for textual file
   */
  static plain: string = 'text/plain';
  /**
   * Adobe Portable Document Format (PDF)
   */
  static pdf: string = 'application/pdf';
  /**
   * Microsoft PowerPoint
   */
  static ppt: string = 'application/vnd.ms-powerpoint';
  /**
   * RAR archive
   */
  static rar: string = 'application/x-rar-compressed';
  /**
   * Rich Text Format (RTF)
   */
  static rtf: string = 'application/rtf';
  /**
   * Bourne shell script
   */
  static sh: string = 'application/x-sh';
  /**
   * Scalable Vector Graphics (SVG)
   */
  static svg: string = 'image/svg+xml';
  /**
   * Small web format (SWF) or Adobe Flash document
   */
  static swf: string = 'application/x-shockwave-flash';
  /**
   * Tape Archive (TAR)
   */
  static tar: string = 'application/x-tar';
  /**
   * Tagged Image File Format (TIFF)
   */
  static tiff: string = 'image/tiff';
  /**
   * TrueType Font
   */
  static ttf: string = 'application/x-font-ttf';
  /**
   * Microsft Visio
   */
  static vsd: string = 'application/vnd.visio';
  /**
   * Waveform Audio Format
   */
  static wav: string = 'audio/x-wav';
  /**
   * WEBM audio
   */
  static weba: string = 'audio/webm';
  /**
   * WEBM video
   */
  static webm: string = 'video/webm';
  /**
   * WEBP image
   */
  static webp: string = 'image/webp';
  /**
   * Web Open Font Format (WOFF)
   */
  static woff: string = 'application/x-font-woff';
  /**
   * XHTML
   */
  static xhtml: string = 'application/xhtml+xml';
  /**
   * Microsoft Excel
   */
  static xls: string = 'application/vnd.ms-excel';
  /**
   * XML
   */
  static xml: string = 'application/xml';
  /**
   * XUL
   */
  static xul: string = 'application/vnd.mozilla.xul+xml';
  /**
   * ZIP archive
   */
  static zip: string = 'application/zip';
  /**
   * 3GPP audio/video container
   */
  static video3gp: string = 'video/3gpp';
  /**
   * 3GPP audio/video container
   */
  static audio3gp: string = 'audio/3gpp';
  /**
   * 3GPP2 audio/video container
   */
  static video3g2: string = 'video/3gpp2';
  /**
   * 3GPP2 audio/video container
   */
  static audio3g2: string = 'audio/3gpp2';
  /**
   * 7-zip archive
   */
  static x7z: string = 'application/x-7z-compressed';
}
