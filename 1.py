import glob
import zlib
import tinyaes
from pathlib import Path
 
CRYPT_BLOCK_SIZE = 16
 
# key obtained from pyimod00_crypto_key
key = bytes('yibaibayibei1801', 'utf-8')
 
for p in Path("PYZ-00.pyz_extracted").glob("**/*.pyc.encrypted"):
    inf = open(p, 'rb') # encrypted file input
    outf = open(p.with_name(p.stem), 'wb') # output file
 
    # Initialization vector
    iv = inf.read(CRYPT_BLOCK_SIZE)
 
    cipher = tinyaes.AES(key, iv)
 
    # Decrypt and decompress
    plaintext = zlib.decompress(cipher.CTR_xcrypt_buffer(inf.read()))
 
    # Write pyc header
    # The header below is for Python 3.8
    outf.write(b'\x55\x0d\x0d\x0a\0\0\0\0\0\0\0\0\0\0\0\0')
 
    # Write decrypted data
    outf.write(plaintext)
 
    inf.close()
    outf.close()
 
    # Delete .pyc.encrypted file
    p.unlink()