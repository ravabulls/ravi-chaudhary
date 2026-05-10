import zipfile
import xml.etree.ElementTree as ET
import os
import shutil
import sys

if len(sys.argv) < 3:
    print("Usage: python extract.py <week_number> <session_number>")
    sys.exit(1)

week_num = sys.argv[1]
session_num = sys.argv[2]
docx_path = rf"f:\OneDrive - NIT Northern Institute of Technology Management gGmbH\my_own_website_project\my-profile-site\ravi-chaudhary\supply chain_draft\SC_Digitization_Week{week_num}_Session{session_num}_Notes.docx"
out_img_dir = r"f:\OneDrive - NIT Northern Institute of Technology Management gGmbH\my_own_website_project\my-profile-site\ravi-chaudhary\public\learnings\online\Supply-Chain-Digitization"

WORD_NAMESPACE = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
PARA = WORD_NAMESPACE + 'p'
TEXT = WORD_NAMESPACE + 't'

def extract_docx(docx_file, w_num, s_num):
    text_content = []
    with zipfile.ZipFile(docx_file) as docx:
        img_count = 1
        for item in docx.namelist():
            if item.startswith('word/media/'):
                ext = item.split('.')[-1]
                new_img_name = f"sc_w{w_num}s{s_num}_image{img_count}.{ext}"
                out_path = os.path.join(out_img_dir, new_img_name)
                with docx.open(item) as source, open(out_path, "wb") as target:
                    shutil.copyfileobj(source, target)
                print(f"[IMAGE_EXTRACTED] {item} -> {new_img_name}")
                text_content.append(f"\n[IMAGE_PLACEHOLDER: {new_img_name}]\n")
                img_count += 1
                
        if 'word/document.xml' in docx.namelist():
            tree = ET.fromstring(docx.read('word/document.xml'))
            for paragraph in tree.iter(PARA):
                texts = [node.text for node in paragraph.iter(TEXT) if node.text]
                if texts:
                    text_content.append("".join(texts))
                else:
                    text_content.append("") 
                    
    return "\n".join(text_content)

if __name__ == "__main__":
    text = extract_docx(docx_path, week_num, session_num)
    out_txt = f"extracted_w{week_num}s{session_num}.txt"
    with open(out_txt, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Done extracting text to {out_txt}")
