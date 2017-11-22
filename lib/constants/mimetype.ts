/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */

/**
 * @class
 * @description
 * List of content types commonly used. The complete list can be found in
 * http://www.iana.org/assignments/media-types/media-types.xhtml -
 * IANA - List of all oficial MIME Types.
 *
 * hint: As the mime types list is huge and this file have just the most 
 * used portion, if a  different string is needed, just create a new object
 * with the corresponding mime type.
 */
export class MimeType {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  /**
    * AAC audio file
    */
  static aac: MimeType = new MimeType('audio/aac');
  /**
   * AbiWord document
   */
  static abw: MimeType = new MimeType('application/x-abiword');
  /**
   * Archive document (multiple files embedded)
   */
  static arc: MimeType = new MimeType('application/octet-stream');
  /**
   * AVI: Audio Video Interleave
   */
  static avi: MimeType = new MimeType('video/x-msvideo');
  /**
   * Amazon Kindle eBook format
   */
  static azw: MimeType = new MimeType('application/vnd.amazon.ebook');
  /**
   * Any kind of binary data
   */
  static bin: MimeType = new MimeType('application/octet-stream');
  /**
   * BZip archive
   */
  static bz: MimeType = new MimeType('application/x-bzip');
  /**
   * BZip2 archive
   */
  static bz2: MimeType = new MimeType('application/x-bzip2');
  /**
   * C-Shell script
   */
  static csh: MimeType = new MimeType('application/x-csh');
  /**
   * Cascading Style Sheets (CSS)
   */
  static css: MimeType = new MimeType('text/css');
  /**
   * Comma-separated values (CSV)
   */
  static csv: MimeType = new MimeType('text/csv');
  /**
   * Microsoft Word
   */
  static doc: MimeType = new MimeType('application/msword');
  /**
   * Electronic publication (EPUB)
   */
  static epub: MimeType = new MimeType('application/epub+zip');
  /**
   * Graphics Interchange Format (GIF)
   */
  static gif: MimeType = new MimeType('image/gif');
  /**
   * HyperText Markup Language (HTML)
   */
  static html: MimeType = new MimeType('text/html');
  /**
   * Icon format
   */
  static icon: MimeType = new MimeType('image/x-icon');
  /**
   * iCalendar format
   */
  static ics: MimeType = new MimeType('text/calendar');
  /**
   * Java Archive (JAR)
   */
  static jar: MimeType = new MimeType('application/java-archive');
  /**
   * JPEG images
   */
  static jpg: MimeType = new MimeType('image/jpeg');
  /**
   * JavaScript (ECMAScript)
   */
  static js: MimeType = new MimeType('application/js');
  /**
   * JSON format
   */
  static json: MimeType = new MimeType('application/json');
  /**
   * Musical Instrument Digital Interface (MIDI)
   */
  static midi: MimeType = new MimeType('audio/midi');
  /**
   * MPEG Video
   */
  static mpeg: MimeType = new MimeType('video/mpeg');
  /**
   * Apple Installer Package
   */
  static mpkg: MimeType = new MimeType('application/vnd.apple.installer+xml');
  /**
   * OpenDocument presentation document
   */
  static odp: MimeType = new MimeType('application/vnd.oasis.opendocument.presentation');
  /**
   * OpenDocument spreadsheet document
   */
  static ods: MimeType = new MimeType('application/vnd.oasis.opendocument.spreadsheet');
  /**
   * OpenDocument text document
   */
  static odt: MimeType = new MimeType('application/vnd.oasis.opendocument.text');
  /**
   * OGG audio
   */
  static oga: MimeType = new MimeType('audio/ogg');
  /**
   * OGG video
   */
  static ogv: MimeType = new MimeType('video/ogg');
  /**
   * OGG
   */
  static ogx: MimeType = new MimeType('application/ogg');
  /**
   * Default value for textual file
   */
  static plain: MimeType = new MimeType('text/plain');
  /**
   * Adobe Portable Document Format (PDF)
   */
  static pdf: MimeType = new MimeType('application/pdf');
  /**
   * Microsoft PowerPoint
   */
  static ppt: MimeType = new MimeType('application/vnd.ms-powerpoint');
  /**
   * RAR archive
   */
  static rar: MimeType = new MimeType('application/x-rar-compressed');
  /**
   * Rich Text Format (RTF)
   */
  static rtf: MimeType = new MimeType('application/rtf');
  /**
   * Bourne shell script
   */
  static sh: MimeType = new MimeType('application/x-sh');
  /**
   * Scalable Vector Graphics (SVG)
   */
  static svg: MimeType = new MimeType('image/svg+xml');
  /**
   * Small web format (SWF) or Adobe Flash document
   */
  static swf: MimeType = new MimeType('application/x-shockwave-flash');
  /**
   * Tape Archive (TAR)
   */
  static tar: MimeType = new MimeType('application/x-tar');
  /**
   * Tagged Image File Format (TIFF)
   */
  static tiff: MimeType = new MimeType('image/tiff');
  /**
   * TrueType Font
   */
  static ttf: MimeType = new MimeType('application/x-font-ttf');
  /**
   * Microsft Visio
   */
  static vsd: MimeType = new MimeType('application/vnd.visio');
  /**
   * Waveform Audio Format
   */
  static wav: MimeType = new MimeType('audio/x-wav');
  /**
   * WEBM audio
   */
  static weba: MimeType = new MimeType('audio/webm');
  /**
   * WEBM video
   */
  static webm: MimeType = new MimeType('video/webm');
  /**
   * WEBP image
   */
  static webp: MimeType = new MimeType('image/webp');
  /**
   * Web Open Font Format (WOFF)
   */
  static woff: MimeType = new MimeType('application/x-font-woff');
  /**
   * XHTML
   */
  static xhtml: MimeType = new MimeType('application/xhtml+xml');
  /**
   * Microsoft Excel
   */
  static xls: MimeType = new MimeType('application/vnd.ms-excel');
  /**
   * XML
   */
  static xml: MimeType = new MimeType('application/xml');
  /**
   * XUL
   */
  static xul: MimeType = new MimeType('application/vnd.mozilla.xul+xml');
  /**
   * ZIP archive
   */
  static zip: MimeType = new MimeType('application/zip');
  /**
   * 3GPP audio/video container
   */
  static video3gp: MimeType = new MimeType('video/3gpp');
  /**
   * 3GPP audio/video container
   */
  static audio3gp: MimeType = new MimeType('audio/3gpp');
  /**
   * 3GPP2 audio/video container
   */
  static video3g2: MimeType = new MimeType('video/3gpp2');
  /**
   * 3GPP2 audio/video container
   */
  static audio3g2: MimeType = new MimeType('audio/3gpp2');
  /**
   * 7-zip archive
   */
  static x7z: MimeType = new MimeType('application/x-7z-compressed');
}
